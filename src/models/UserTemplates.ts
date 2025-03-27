import { TemplateType } from "@/utils/interfaces";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IEngagementMetric {
    date: string;
    count: number;
}

interface IUserTemplate extends Document {
    user_id: string;
    templateNames: TemplateType[];
    engagement: {
        socialClicks: IEngagementMetric[];
        projectClicks: IEngagementMetric[];
        timeSpent: IEngagementMetric[];
    }
}

const userTemplatesSchema = new Schema<IUserTemplate>({
    user_id: { type: String, required: true },
    templateNames: { type: [String], default: [] },
    engagement: {
        socialClicks: { type: [{ date: String, count: Number }], default: [] },
        projectClicks: { type: [{ date: String, count: Number }], default: [] },
        timeSpent: { type: [{ date: String, count: Number }], default: [] },
    }
});

const UserTemplates: Model<IUserTemplate> = mongoose.models.UserTemplates || mongoose.model<IUserTemplate>("UserTemplates", userTemplatesSchema);

export default UserTemplates;
