import { TemplateType } from "@/utils/interfaces";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserTemplate extends Document {
    user_id: string;
    templateNames: TemplateType[];
}

const userTemplatesSchema = new Schema<IUserTemplate>({
    user_id: { type: String, required: true },
    templateNames: { type: Array, default: [] },
});

const UserTemplates: Model<IUserTemplate> = mongoose.models.UserTemplates || mongoose.model<IUserTemplate>("UserTemplates", userTemplatesSchema);

export default UserTemplates;
