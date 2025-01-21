import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/auth-options";
import connectMongoDb from "@/lib/db";
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

        const templateNames = await UserTemplates.findOne({ user_id: userId });

        res.status(200).json({ success: true, message: "Template names", data: templateNames?.templateNames || [] });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}
