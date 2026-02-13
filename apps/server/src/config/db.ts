import mongoose from 'mongoose';
import Logger from '../core/Logger';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        Logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        Logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
