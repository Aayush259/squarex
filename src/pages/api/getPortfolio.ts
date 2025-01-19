import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { templateName, slug } = req.body;

    if (!templateName || !slug) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        await connectMongoDb();

        const template = await mongoose.connection.collection(templateName).findOne({ user_id: slug });

        if (template) {
            res.status(200).json({ success: true, message: "Portfolio", data: template });
        } else {
            
            res.status(404).json({ success: false, message: "NOT_FOUND" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
