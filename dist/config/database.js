// this file responsible for mongoDB database connection
// in order to connect to mongoDB requiring mongoose ODM as project level dependenscies
import mongoose from "mongoose";
const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGO_DB_URL;
        if (!mongoUri) {
            throw new Error("Incorrect MongoDB URL Connection.");
        }
        mongoose.connect(mongoUri);
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }
    catch (error) {
        throw new Error(`Failed connecting to database: ${error}.`);
    }
};
const disconnectDb = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        throw new Error("Database is not connected.");
    }
    catch (error) {
        throw new Error(`Failed to disconnect from database: ${error}`);
    }
};
export { connectDb, disconnectDb };
//# sourceMappingURL=database.js.map