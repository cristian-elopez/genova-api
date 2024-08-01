import mongoose from "mongoose";

export const dbConecction = async (): Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error("DB_URL no está definida");
        };
        await mongoose.connect(dbURL);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos");        
    }
};