import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "no-reply@yourapp.com",
    to: email,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  });
};
