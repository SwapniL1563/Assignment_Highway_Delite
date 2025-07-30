import nodemailer from "nodemailer";

export const sendOTP = async (to:string,subject:string,text:string) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASSWORD
        },
    })

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text,
    })
};

