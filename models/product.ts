import { Model, Schema, model } from "mongoose";
import { SIZES } from "../helpers/constants";

export interface IProduct {
    tittle: string;
    category: string;
    gender: string;
    desc?: string;
    price: number;
    quantity?: number;
    color: string;
    size?: string;
    userId: string;
    state?: string;
    images: string[];
};  

const productSchema = new Schema({
    tittle: {
        type: String,
        required: [true, "El título es obligatorio"],
        unique: true
    },
    category: {
        type: String,
        required: [true, "La categoría es obligatoria"]
    },
    gender: {
        type: String,
        required: [true, "El género es obligatorio"]
    },
    desc: {
        type: String,
        default: " "
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    color: {
        type: String,
        required: [true, "El color es obligatorio"]
    },
    size: {
        type: String,
        default: SIZES.unico
    },
    userId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: true
    },
    images: {
        type: [String],
        required: [true, "La imagen es obligatoria"]
    }
});

productSchema.methods.toJSON = function() {
    const {__v,userId,...product} = this.toObject();
    return product
};

const Product: Model<IProduct> = model<IProduct>("Product", productSchema);
export default Product;