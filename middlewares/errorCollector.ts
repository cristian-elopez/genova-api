import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const errorCollector = (req: Request,res: Response,next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors);
    } else {
        next();
    }
};