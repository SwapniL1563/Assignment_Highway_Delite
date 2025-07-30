import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtUser {
    id: string;
    email: string;
}

export interface AuthRequest extends Request {
    user?: JwtUser;
}

export const authMiddleware = (req: AuthRequest,res:Response,next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Unauthorised"
            })
        };

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as JwtUser;
        req.user = decoded;

        next(); 
    }   catch(error) {
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}