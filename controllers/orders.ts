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
                msg: "No se han encontrado algunos productos"
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
            msg: "Pedido creado con éxito",
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor"
        })  
    }
};

export const getOrders = async (req: Request,res: Response): Promise<void> => {
    try {
        const userId: string = req.body.confirmedUser._id;
        const orders = await Order.find({user: userId});
        res.status(200).json({
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno del servidor"
        })        
    };
};