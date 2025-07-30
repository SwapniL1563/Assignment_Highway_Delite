import mongoose, { Document, Schema } from "mongoose";
import { ref } from "process";

export interface NOTES extends Document {
    user:mongoose.Types.ObjectId,
    note:string,
}


const noteSchema = new Schema<NOTES>({
    user: {type:Schema.Types.ObjectId,ref:"User",required:true},
    note: {type:String,required:true},
});

export const Note = mongoose.model<NOTES>("Note",noteSchema)