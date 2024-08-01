import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

export const validateJWT = async (req: Request,res: Response,next: NextFunction) => {
    const token = req.headers["x-token"] as string;
    if(!token) {
        res.status(401).json({
            msg: "No se ha proporcionado ningún token"
        })
        return
    };
    try {
        const jwtKey = process.env.JWT_SECRET_KEY as string;
        const payload = jwt.verify(token,jwtKey) as JwtPayload;        
        const {id} = payload;
        const confirmedUser: IUser | null = await User.findById(id);
        if(!confirmedUser) {
            res.status(404).json({
                msg: "Usuario no encontrado"
            })
            return
        }
        req.body.confirmedUser = confirmedUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        })
    }
};