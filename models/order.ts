import { Model, Schema, Types, model } from "mongoose";
import { IProduct } from "./product";

interface IShippingDetails {
    name: string;
    cellphone: number;
    location: string;
    adress: string;
    zipCode: number;
};

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: number;
    shippingCost: number;
    shippingDetails: IShippingDetails;
    state: string;
    total: number;
    products: IProduct[];
};

const OrderSchema = new Schema<IOrder>({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        cellphone: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        }
    },
    state: {
        type: String,
        default: "pending"
    },
    total: {
        type: Number,
        required: true
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        required: true
    }
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);
export default Order;