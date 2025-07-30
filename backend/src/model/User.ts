import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
    name:string,
    email:string,
    otp?:string,
    otpExpiry?:Date,
    dateOfBirth?:Date,
}

const userSchema = new Schema<UserInterface>(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        otp:{type:String,
            required: function(){
                return this.isNew
            }
        },
        otpExpiry:{type:Date},
        dateOfBirth:{type:Date}
    },
    {timestamps : true}
);

export const User = mongoose.model<UserInterface>("User",userSchema)