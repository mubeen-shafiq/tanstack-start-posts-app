import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: String(process.env.SMTP_HOST),
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: String(process.env.SMTP_AUTH_USER),
    pass: String(process.env.SMTP_AUTH_PASSWORD),
  },
});

export default transporter;
