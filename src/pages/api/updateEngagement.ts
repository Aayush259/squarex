import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDb from "@/lib/db";
import UserTemplates from "@/models/UserTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { slug, socialClicks, projectClicks, timeSpent } = req.body;

    if (!slug) {
        return res.status(400).json({ success: false, message: "Slug is required" });
    }

    try {
        await connectMongoDb();

        const userTemplate = await UserTemplates.findOne({ user_id: slug });

        if (!userTemplate) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }

        // Update engagement stats
        userTemplate.engagement.socialClicks += socialClicks || 0;
        userTemplate.engagement.projectClicks += projectClicks || 0;
        userTemplate.engagement.timeSpent += timeSpent || 0;

        await userTemplate.save();

        return res.status(200).json({ success: true, message: "Engagement updated", data: true });
    } catch (error) {
        console.error("Error updating engagement:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
