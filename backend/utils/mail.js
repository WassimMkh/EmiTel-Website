import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "EmiTel Club <onboarding@resend.dev>", 
      to,  
      subject,
      html,
    });

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error("Email sending failed: " + err.message);
  }
};

