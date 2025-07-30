import { Request, Response } from "express";
import { Note } from "../model/Note";

interface AuthRequest extends Request {
    user?:{ id: string , email : string }
}

export const createNote = async (req:AuthRequest,res:Response) => {
    try {
        const { note } = req.body;
        
        // check if note is provided
        if(!note){
            return res.status(400).json({
                message:"Note text not provide"
            })
        }

        // if yes then create note for the same logged in user
        const newNote = await Note.create({
            user:req.user?.id,
            note,
        })

        return res.status(200).json(newNote);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create note", error });
    }
}

export const getNotes = async(req:AuthRequest,res:Response) => {
    try {
      const notes = await Note.find({ user:req.user?.id}).sort({ createdAt:-1 });
      return res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notes", error });
    }
}


export const deleteNote = async(req:AuthRequest,res:Response) => {
    try {
        const { id } = req.params;
        
        await Note.findByIdAndDelete({
            _id:id, user:req.user?.id
        });

        return res.status(200).json({
            message:"Deleted Note successfully!"
        });
    } catch(error) {
        return res.status(500).json({ message: "Failed to delete note", error });
    }
}