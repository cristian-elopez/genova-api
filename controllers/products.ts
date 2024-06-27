import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

export const createProduct = async (req: Request,res: Response): Promise<void> => {
    try {
        const { confirmedUser, ...productData } = req.body;
        const userId: string = req.body.confirmedUser._id;

        const product = new Product({userId, ...productData});
        await product.save();
        
        res.status(201).json({
            msg: "Product created successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })        
    };
};

export const getProducts = async (req: Request,res: Response): Promise<void> => {
    try {
        const products = await Product.find({state: true});
        res.status(200).json({
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })        
    };
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateData: IProduct = req.body;

        const updateProduct: IProduct | null = await Product.findOneAndUpdate(
            {tittle: req.params.tittle},
            updateData,
            {new: true}
        );
        
        res.status(200).json({
            msg: "Product updated successfully",
            updateProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })   
    };
};

export const softDeleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {tittle} = req.body;
        const deleteProduct: IProduct | null = await Product.findOneAndUpdate(
            {tittle},
            {estate: false}        
        );
        res.status(200).json({
            msg: "Product deleted successfully",
            deleteProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        }) 
    }
};

export const hardDeleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const {tittle} = req.body;
        const deleteProduct: IProduct | null = await Product.findOneAndDelete({tittle});
        res.status(200).json({
            msg: "Product deleted successfully",
            deleteProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        }) 
    }
};