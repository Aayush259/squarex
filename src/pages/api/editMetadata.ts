import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/auth-options";
import connectMongoDb from "@/lib/db";
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

    const { templateName, page_title, page_description } = req.body;

    if (!templateName) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        await connectMongoDb();

        const template = await mongoose.connection.collection(templateName).findOne({ user_id: userId });

        if (!template) {
            return res.status(404).json({ success: false, message: "Template not found" });
        }

        if (page_title) template.page_title = page_title;
        if (page_description) template.page_description = page_description;
        await mongoose.connection.collection(templateName).updateOne({ user_id: userId }, { $set: template });

        res.status(200).json({ success: true, message: "Updated successfully", data: template });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
