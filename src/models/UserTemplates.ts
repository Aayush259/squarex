import { TemplateType } from "@/utils/interfaces";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserTemplate extends Document {
    user_id: string;
    templateNames: TemplateType[];
    engagement: {
        socialClicks: number;
        projectClicks: number;
        timeSpent: number;
    }
}

const userTemplatesSchema = new Schema<IUserTemplate>({
    user_id: { type: String, required: true },
    templateNames: { type: Array, default: [] },
    engagement: {
        socialClicks: { type: Number, default: 0 },
        projectClicks: { type: Number, default: 0 },
        timeSpent: { type: Number, default: 0 },
    }
});

const UserTemplates: Model<IUserTemplate> = mongoose.models.UserTemplates || mongoose.model<IUserTemplate>("UserTemplates", userTemplatesSchema);

export default UserTemplates;
