import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import View from "@/models/View";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { templateName, slug } = req.body;
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    if (!templateName || !slug) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        await connectMongoDb();

        // Check if this IP + User-Agent combo has already viewed within last 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const existingView = await View.findOne({
            portfolioId: slug,
            ipAddress: userIp,
            userAgent,
            timestamp: { $gte: tenMinutesAgo },
        });

        const template = await mongoose.connection.collection(templateName).findOne({ user_id: slug });

        if (template) {
            if (!existingView) {
                // Get today's date
                const today = new Date().toISOString().split('T')[0];

                // Initialize views array if it doesn't exist
                if (!template.data.views || !Array.isArray(template.data.views)) {
                    template.data.views = [];
                }

                // Find if there's an entry for today
                const todayViewIndex = template.data.views.findIndex(
                    (view: { date: string; count: number }) => view.date === today
                );

                if (todayViewIndex >= 0) {
                    // Update today's count
                    template.data.views[todayViewIndex].count += 1;
                } else {
                    // Add a new entry for today
                    template.data.views.push({ date: today, count: 1 });
                }

                await mongoose.connection.collection(templateName).updateOne(
                    { user_id: slug },
                    { $set: { "data.views": template.data.views } }
                );

                await View.create({ portfolioId: slug, ipAddress: userIp, userAgent });
            }
            res.status(200).json({ success: true, message: "Portfolio", data: template });
        } else {
            res.status(404).json({ success: false, message: "NOT_FOUND" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
