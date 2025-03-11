import mongoose, { Document, Model, Schema } from "mongoose";

interface IContact extends Document {
    user_id: string;
    templateName: string;
    data: {
        name: string;
        email: string;
        message: string;
    };
    visited: boolean;
    createdAt: Date;
}

const contactSchema = new Schema<IContact>({
    user_id: { type: String, required: true },
    data: { type: Object, required: true },
    visited: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
});

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
