import dotenv from "dotenv";
import express, { Express, Response } from "express";
import cors from "cors";
import { dbConecction } from "./database/config";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";
import ordersRoutes from "./routes/orders";

dotenv.config();

let app: Express;
let port: number | string | undefined;
let authPath: string;
let productsPath: string;
let ordersPath: string;

app = express();
port = process.env.PORT || 8080;
authPath = "/auth";
productsPath = "/products";
ordersPath = "/orders";

async function conectToDB(): Promise<void> {
    await dbConecction();
};

function middlewares(): void {
    app.use(express.json());
    app.use(cors());
    app.use(express.static("public"));
};

function routes(): void {
    app.use(authPath, authRoutes);
    app.use(productsPath, productsRoutes);
    app.use(ordersPath, ordersRoutes);
};

function listen(): void {
    app.get("/", (res: Response) => {
        res.sendFile(__dirname + "/public/index.html")
    })
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
};

middlewares();
routes();
conectToDB();
listen();

export default app;