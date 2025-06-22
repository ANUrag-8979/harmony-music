import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs';
import User from '@/models/user';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    function isAllAlphabets(str) {
    return /^[A-Za-z]+$/.test(str);
  }
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    let hashedToken2 = "";
    for(let i=0;i<hashedToken.length;i++){
      if(isAllAlphabets(hashedToken[i])) hashedToken2 += hashedToken[i];
    }

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken2,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken2,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "17a68f71641298",
        pass: "bc3581428b54cd",
      },
    });

    const domain = process.env.DOMAIN || "http://localhost:3000";
    const link = `${domain}/verifyemail?token=${hashedToken2}`;

    const message = {
      from: '"SkyScope App" <no-reply@skyscope.app>',
      to: email, // ✅ send to user's email
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <p>Click <a href="${link}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
        <p>Or copy and paste the link below in your browser:</p>
        <p>${link}</p>
      `,
    };

    const mailResponse = await transport.sendMail(message);
    return mailResponse;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Email could not be sent.");
  }
};
