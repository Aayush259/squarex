import { Basic1TemplateData } from "@/utils/interfaces";
import mongoose, { Document, Model, Schema } from "mongoose";

interface IBasic1Template extends Document {
    user_id: string;
    data: Basic1TemplateData;
    page_title: string;
    page_description: string;
}

const basic1TemplateSchema = new Schema<IBasic1Template>({
    user_id: { type: String, required: true },
    data: { type: Object, required: true },
    page_title: { type: String, required: false },
    page_description: { type: String, required: false },
});

const Basic1Template: Model<IBasic1Template> = mongoose.models.User || mongoose.model<IBasic1Template>("Basic1Template", basic1TemplateSchema);

export default Basic1Template;
