import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user";

export const sendEmail = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  try {
    const token = await bcryptjs.hash(userId.toString(), 10);

    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });

    const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GOOGLE_APP_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.GOOGLE_APP_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${url}">here</a> to "reset your password"
          or copy and paste the link below in your browser. <br> ${url}</p>`,
    };

    const response = await transport.sendMail(emailOptions);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
