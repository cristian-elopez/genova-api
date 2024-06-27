import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    name: string;
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: boolean;
    state?: string;
};

const userSchema = new Schema<IUser> ({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        default: true
    }
});

userSchema.methods.toJSON = function() {
    const {__v,password,_id,code,state,...user} = this.toObject();
    return user
};

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;