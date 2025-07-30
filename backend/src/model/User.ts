import mongoose, { Document, Schema } from "mongoose";

export interface USER extends Document {
    name:string,
    email:string,
    otp:string,
    otpExpiry:Date,
    dateOfBirth?:Date,
}

const userSchema = new Schema<USER>(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        otp:{type:String,required:true},
        otpExpiry:{type:Date},
        dateOfBirth:{type:Date}
    },
    {timestamps : true}
);

export const User = mongoose.model<USER>("User",userSchema)