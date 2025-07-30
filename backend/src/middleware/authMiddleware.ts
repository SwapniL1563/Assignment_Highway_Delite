import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
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

        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
        req.user = decoded;

        next(); 
    }   catch(error) {
        return res.status(401).json({
            message:"Invalid or expired token";
        })
    }
}