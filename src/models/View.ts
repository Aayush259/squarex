import mongoose, { Document, Model, Schema } from "mongoose";

interface IView extends Document {
    portfolioId: string;
    ipAddress: string;
    userAgent: string;
    timestamp: Date;
}

const ViewSchema = new Schema<IView>({
    portfolioId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const View: Model<IView> = mongoose.models.View || mongoose.model<IView>("View", ViewSchema);

export default View;
