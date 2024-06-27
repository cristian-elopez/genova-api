import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constants";

export const isAdmin = (req: Request,res: Response,next: NextFunction): void => {
    const userRol: string = req.body.confirmedUser.rol;
    if(userRol !== ROLES.admin) {
        res.status(401).json({
            msg: "User not is admin",
        })
        return
    }
    next();
};

export const isVerified = (req: Request,res: Response,next: NextFunction): void => {
    const verifiedUser: boolean = req.body.confirmedUser.verified;
    if(!verifiedUser) {
        res.status(401).json({
            msg: "User not verified",
        })
        return
    }
    next();
};