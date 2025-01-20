import mongoose, { Document, Model, Schema } from "mongoose";

interface IContact extends Document {
    user_id: string;
    templateName: string;
    data: {
        name: string;
        email: string;
        message: string;
    }
}

const contactSchema = new Schema<IContact>({
    user_id: { type: String, required: true },
    data: { type: Object, required: true },
});

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
