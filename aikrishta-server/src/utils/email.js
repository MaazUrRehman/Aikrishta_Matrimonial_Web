

import transporter from "../config/mail.js";

const sendEmail = async ({ email, subject, message, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text: message || "",
      html: html || "",
      // Spam se bachne ke liye headers
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log(`📧 Sending email to: ${email}`);
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email Sent Successfully");
    console.log("📨 Message ID:", info.messageId);
    
    return info;
  } catch (error) {
    console.error("❌ Email Send Error:", error.message);
    console.log(error);
  }
};

export default sendEmail;
