import { Request, Response } from "express";
import { User, UserInterface } from "../model/User";
import { generateOTP } from "../utils/generateOTP";
import { sendOTP } from "../utils/sendOTP";
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middleware/authMiddleware";

export const sendSignupOtp = async(req:Request,res:Response) => {
    try {
        const { email, name, dateOfBirth } = req.body;

        if(!email || !name) {
            return res.status(400).json({
                error:"Please provide name and email"
            });
        }

        // if provided then generate otp for user
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 60*60*1000);

        // now create / update user
        let user : UserInterface | null = await User.findOne({
            email
        });

        if(!user) {
            user = new User({name,email,otp,otpExpiry,dateOfBirth});
        } else {
           user.otp = otp;
           user.otpExpiry = otpExpiry;
           if(dateOfBirth) user.dateOfBirth = dateOfBirth;
        }

        await user.save();

        // now after creating user send otp to user using utils
        await sendOTP(email, "Your OTP Code for " , `Your OTP is ${otp}`);

        return res.status(200).json({
            message:"OTP sent to email successfully!"
        });
    } catch(error) {
        return res.status(500).json({
            message:"Failed to send OTP",error:error
        })
    }
}

export const sendSigninOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTP(email, "Sign In OTP", `Your OTP is ${otp}`);
    return res.json({ message: "Signin OTP sent to email" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to send OTP", error });
  }
};

export const verifyOtp = async(req:Request,res:Response) => {
    try {
        const { email , otp } = req.body;
        
        // if email and otp are not there
        if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
        }

        // check if user exists , otp is provided , otp is valid and also otp isn't expired
        const user : UserInterface | null = await User.findOne({email});

        if (!user) {
        return res.status(400).json({ message: "User not found" });
        }

        // check if OTP is expired or not
        if (!user.otpExpiry || user.otpExpiry < new Date()) {
       return res.status(400).json({ message: "OTP expired" });
        }

        // validate the OTP
        if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
        }

        // clear OTP fields
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        if(!process.env.JWT_SECRET){
            throw new Error("JWT Secret not defined")
        }

        // generate JWT token now 
        const token = jwt.sign(
        { id:user._id,email:user.email },
        process.env.JWT_SECRET,
        { expiresIn:"1d"}
        );

        return res.status(200).json({ message:"OTP verified successfully",token, user});
    } catch (error) {
         return res.status(500).json({ message: "OTP verification failed", error: error });
    }
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-otp -otpExpiry");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

