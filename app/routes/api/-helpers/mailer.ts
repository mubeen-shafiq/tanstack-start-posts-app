import transporter from "@/lib/mail";
import { EmailVerificationMailerPayload } from "@/definitions/types/auth";

export const sendEmailVerificationMailer = async (
  payload: EmailVerificationMailerPayload,
) => {
  const html = `
    <div>
      <center><h3>Verify Your Email</h3></center>
      <div>
        <br />
        <p>Hi ${payload.name},</p>
        <br />
        <p>Thank you for register with our product. Here is the email verification email so that you gain access to our product!</p>
        <br />
        <center>
          <a href="${payload.redirectUrl}" target="_blank" ref="noopener noreferrer"><strong>Verify Email</strong></a>
        </center>
      </div>      
    </div>
  `;

  try {
    await transporter.sendMail({
      subject: "Verify your Email!",
      to: payload.to,
      html: html,
      from: process.env.SMTP_SENDER!,
    });
  } catch (error) {
    console.log(error);
  } finally {
    return;
  }
};
