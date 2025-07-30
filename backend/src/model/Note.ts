import mongoose, { Document, Schema } from "mongoose";

export interface NotesInterface extends Document {
    user:mongoose.Types.ObjectId,
    note:string,
}


const noteSchema = new Schema<NotesInterface>({
    user: {type:Schema.Types.ObjectId,ref:"User",required:true},
    note: {type:String,required:true},
});

export const Note = mongoose.model<NotesInterface>("Note",noteSchema)