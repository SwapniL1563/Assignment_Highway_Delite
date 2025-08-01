import nodemailer from "nodemailer";

export const sendOTP = async (to:string,subject:string,text:string) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        },
    })

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text,
    })
};

