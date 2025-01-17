import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/auth-options";
import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

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

        if (existingTemplate) {
            // Update the existing template
            existingTemplate.data = templateData;
            await mongoose.connection.collection(templateName).updateOne({ user_id: userId }, { $set: existingTemplate });
            res.status(201).json({ success: true, message: "Updated portfolio" });
        } else {
            // Create a new template
            const newTemplate = {
                user_id: userId,
                data: templateData
            };
            await mongoose.connection.collection(templateName).insertOne(newTemplate);
            res.status(201).json({ success: true, message: "Created portfolio" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
