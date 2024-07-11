import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";

export const createOrders = async (req: Request,res: Response): Promise<void> => {
    try {
        const { confirmedUser, products, ...orderData } = req.body;
        const userId: string = req.body.confirmedUser._id;
        const confirmedProducts = await Product.find({
            tittle: products
        });
        
        if (products.length > confirmedProducts.length || !confirmedProducts) {
            res.status(404).json({
                msg: "Some products not found"
            })
            return;
        };
        const data = {
            ...orderData,
            user: userId,
            products: confirmedProducts
        };
        const order = new Order(data);
        await order.save();
        
        res.status(201).json({
            msg: "Order created successfully",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })  
    }
};

export const getOrders = async (req: Request,res: Response): Promise<void> => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })        
    };
};