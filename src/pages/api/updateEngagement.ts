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

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Initialize engagement arrays
        if (!userTemplate.engagement) {
            userTemplate.engagement = {
                socialClicks: [],
                projectClicks: [],
                timeSpent: [],
            };
        }

        // Update socialClicks
        if (socialClicks && socialClicks > 0) {
            // Initialize the array if it doesn't exist
            if (!Array.isArray(userTemplate.engagement.socialClicks)) {
                userTemplate.engagement.socialClicks = [];
            }

            const todayIndex = userTemplate.engagement.socialClicks.findIndex(item => item.date === today);
            if (todayIndex >= 0) {
                userTemplate.engagement.socialClicks[todayIndex].count += socialClicks;
            } else {
                userTemplate.engagement.socialClicks.push({ date: today, count: socialClicks });
            }
        }

        // Update projectClicks
        if (projectClicks && projectClicks > 0) {
            // Initialize the array if it doesn't exist
            if (!Array.isArray(userTemplate.engagement.projectClicks)) {
                userTemplate.engagement.projectClicks = [];
            }
            
            const todayIndex = userTemplate.engagement.projectClicks.findIndex(item => item.date === today);
            if (todayIndex >= 0) {
                userTemplate.engagement.projectClicks[todayIndex].count += projectClicks;
            } else {
                userTemplate.engagement.projectClicks.push({ date: today, count: projectClicks });
            }
        }

        // Update timeSpent
        if (timeSpent && timeSpent > 0) {
            // Initialize the array if it doesn't exist
            if (!Array.isArray(userTemplate.engagement.timeSpent)) {
                userTemplate.engagement.timeSpent = [];
            }
            
            const todayIndex = userTemplate.engagement.timeSpent.findIndex(item => item.date === today);
            if (todayIndex >= 0) {
                userTemplate.engagement.timeSpent[todayIndex].count += timeSpent;
            } else {
                userTemplate.engagement.timeSpent.push({ date: today, count: timeSpent });
            }
        }

        await userTemplate.save();

        return res.status(200).json({ success: true, message: "Engagement updated", data: true });
    } catch (error) {
        console.error("Error updating engagement:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
