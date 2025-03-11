import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/auth-options";
import connectMongoDb from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { messageIds } = req.body;

    if (!messageIds) {
        return res.status(400).json({ success: false, message: "messageIds is required" });
    }

    try {
        await connectMongoDb();

        messageIds.forEach(async (messageId: string) => {
            await Contact.findByIdAndUpdate(messageId, { visited: true });
        });

        res.status(200).json({ success: true, message: "Messages marked as visited", data: messageIds });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
