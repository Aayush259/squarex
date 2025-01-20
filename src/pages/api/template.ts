import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/auth-options";
import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Readable } from 'stream';
import cloudinary from 'cloudinary';

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
};

type TTemplateData = {
    [key: string]: string | number | Buffer | TTemplateData | TTemplateData[];
}

interface UploadImageResponse {
    success: boolean;
    url?: string;
}

const uploadImage = async (imageBuffer: Buffer): Promise<UploadImageResponse> => {
    try {
        if (!imageBuffer) {
            throw new Error("Image buffer is undefined");
        }

        connectMongoDb();

        const stream = Readable.from(imageBuffer);

        const uploadPromise = new Promise<string>((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                { folder: "SquareX" },
                (error, result) => {
                    if (error) {
                        reject(new Error("Cloudinary Image Upload error: " + error.message));
                    } else {
                        resolve(result?.secure_url || "dummy image url");
                    }
                }
            )

            stream.pipe(uploadStream);
        });

        const imageUrl = await uploadPromise;
        return { success: true, url: imageUrl };
    } catch (error) {
        return { success: false };
    }
}

const processImages = async (templateData: TTemplateData): Promise<void> => {

    async function traverseAndProcess(templateData: TTemplateData | TTemplateData[]): Promise<void> {
        if (Array.isArray(templateData)) {
            for (const item of templateData) {
                await traverseAndProcess(item);
            }
        } else if (templateData !== null && typeof templateData === "object") {
            for (const key in templateData) {
                if (key === "image" && typeof templateData[key] === "string" && templateData[key].startsWith("data:image")) {
                    const base64string = templateData[key].split(",")[1];  // Remove metadata
                    const imageBuffer = Buffer.from(base64string, "base64");
                    const imageUploadResponse = await uploadImage(imageBuffer);
                    if (imageUploadResponse.success && imageUploadResponse?.url) {
                        templateData[key] = imageUploadResponse.url;
                    } else {
                        templateData[key] = "<dummy image url>";
                    }
                } else {
                    await traverseAndProcess(templateData[key] as TTemplateData | TTemplateData[]);
                }
            }
        }
    }

    await traverseAndProcess(templateData);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = session.user.id;

    const { templateName, templateData } = req.body;

    if (!templateName || !templateData) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        await connectMongoDb();

        const existingTemplate = await mongoose.connection.collection(templateName).findOne({ user_id: userId });

        let updatedTemplateData = JSON.parse(JSON.stringify(templateData));

        await processImages(updatedTemplateData);

        if (existingTemplate) {
            // Update the existing template
            existingTemplate.data = updatedTemplateData;
            await mongoose.connection.collection(templateName).updateOne({ user_id: userId }, { $set: existingTemplate });
            res.status(201).json({ success: true, message: "Updated portfolio", data: existingTemplate });
        } else {
            // Create a new template
            const newTemplate = {
                user_id: userId,
                data: updatedTemplateData
            };
            await mongoose.connection.collection(templateName).insertOne(newTemplate);
            res.status(201).json({ success: true, message: "Created portfolio", data: newTemplate });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
