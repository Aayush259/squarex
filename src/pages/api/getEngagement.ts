import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/auth-options";
import connectMongoDb from "@/lib/db";
import mongoose from "mongoose";
import UserTemplates from "@/models/UserTemplates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = session.user.id;

    try {
        await connectMongoDb();

        // Get the user's template names
        const userTemplatesDoc = await UserTemplates.findOne({ user_id: userId });
        
        if (!userTemplatesDoc || !userTemplatesDoc.templateNames.length) {
            return res.status(200).json({ 
                success: true, 
                message: "No templates found", 
                data: [] 
            });
        }
        
        // Prepare an array to store template data with views
        const templatesWithViews = [];
        
        // For each template name, fetch the template data to get views
        for (const templateName of userTemplatesDoc.templateNames) {
            if (!templateName) continue;
            const templateDoc = await mongoose.connection.collection(templateName).findOne({ user_id: userId });
            
            if (templateDoc) {
                templatesWithViews.push({
                    templateName: templateName,
                    views: templateDoc.data.views || 0,
                });
            }
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Template views retrieved successfully", 
            data: {
                views: templatesWithViews,
                engagement: userTemplatesDoc.engagement,
            }
        });
    } catch (error) {
        console.error("Error getting engagement:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
