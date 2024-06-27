import mongoose from "mongoose";

export const dbConecction = async (): Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL is not defined");
        };
        await mongoose.connect(dbURL);
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to database");        
    }
};