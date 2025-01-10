import mongoose from "mongoose";

const connectMongoDb = async () => {
    if (mongoose.connection.readyState === 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

export default connectMongoDb;
