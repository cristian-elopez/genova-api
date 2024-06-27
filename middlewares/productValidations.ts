import Product, { IProduct } from "../models/product";
import { CATEGORIES, GENDER, SIZES } from "../helpers/constants";
import { NextFunction, Request, Response } from "express";

export const tittleProductExist = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    const {tittle} = req.body;
    const productExist = await Product.findOne({tittle});
    if(productExist) {
        res.status(400).json({
            msg: `The product "${tittle}" already exists`,
        })
        return
    };
    next();
};

export const categoryValidation = (req: Request,res: Response,next: NextFunction): void => {
    const {category} = req.body;
    if(
        category !== CATEGORIES.buzo &&
        category !== CATEGORIES.campera &&
        category !== CATEGORIES.remera &&
        category !== CATEGORIES.pantalon &&
        category !== CATEGORIES.accesorio) {
        res.status(400).json({
            msg: `Product category is not correct`,
        })
        return
    };
    next();
};

export const genderValidation = (req: Request,res: Response,next: NextFunction): void => {
    const {gender} = req.body;
    if(
        gender !== GENDER.masculino && 
        gender !== GENDER.femenino) {
        res.status(400).json({
            msg: `Product gender is not correct`,
        })
        return
    };
    next();
};

export const sizeValidation = (req: Request,res: Response,next: NextFunction): void => {
    const {size} = req.body;
    if(
        size !== SIZES.unico &&
        size !== SIZES.xs &&
        size !== SIZES.s &&
        size !== SIZES.m &&
        size !== SIZES.l &&
        size !== SIZES.xl &&
        size !== SIZES.xxl) {
        res.status(400).json({
            msg: `Product size is not correct`,
        })
        return
    };
    next();
};

export const productExist = async (req: Request,res: Response,next: NextFunction) => {
    const {tittle,newTittle,...data} = req.body;
    const productExist: IProduct | null = await Product.findOne({tittle});
    if(!productExist) {
        res.status(404).json({
            msg: `Product not found`,
        })
        return
    };
    const updateProduct = {
        tittle: newTittle || productExist.tittle,
        category: data.category || productExist.category,
        gender: data.gender || productExist.gender,
        desc: data.desc || productExist.desc,
        price: data.price || productExist.price,
        quantity: data.quantity || productExist.quantity,
        color: data.color || productExist.color,
        size: data.size || productExist.size,
        userId: productExist.userId,
        images: data.images || productExist.images,
    }
    req.body = updateProduct;
    req.params.tittle = tittle;
    next();
};