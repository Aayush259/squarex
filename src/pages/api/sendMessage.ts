import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { user_id, templateName, name, email, message } = req.body;

    if (!templateName || !user_id || !name || !email || !message) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        await connectMongoDb();

        const contact = new Contact({
            user_id,
            templateName,
            data: {
                name,
                email,
                message
            }
        });

        await contact.save();
        res.status(200).json({ success: true, message: "Message sent successfully", data: contact });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
