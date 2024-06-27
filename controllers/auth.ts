import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { jwtGenerator } from "../helpers/jwtGenerator";

export const register = async (req: Request,res: Response): Promise<void> => {
    try {
        const {name,email,password,rol}: IUser = req.body;
        const user = new User({name,email,password,rol});
        
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        const adminKey = req.headers["admin-key"];
        if (adminKey === process.env.ADMIN_KEY) {
            user.rol = ROLES.admin;
        };

        const newCode = randomstring.generate(6);
        user.code = newCode;

        await user.save();
        await sendEmail(email,newCode);

        res.status(201).json({
            msg: "User created successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Invalid request"
        })
    };
};

export const login = async (req: Request,res: Response): Promise<void> => {
    try {
        const {email,password}: IUser = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({
                msg: "User not found",
            });
            return
        };

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({
                msg: "Invalid password",
            });
            return
        };

        const token = await jwtGenerator(user.id);

        res.status(202).json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    };
};

export const verifyUser = async (req: Request,res: Response): Promise<void> => {
    try {
        const {email,code}: IUser = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({
                msg: "User not found",
            });
            return
        };
        if (user.verified) {
            res.status(400).json({
                msg: "User already verified",
            });
            return
        };
        if (user.code !== code) {
            res.status(401).json({
                msg: "Invalid code",
            });
            return
        };

        await User.findOneAndUpdate(
            {email},
            {verified: true}
        );

        res.status(202).json({
            msg: "User verified successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
};

export const getUsers = async (req: Request,res: Response): Promise<void> => {
    try {
        const users = await User.find({state: true});
        res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    };
};