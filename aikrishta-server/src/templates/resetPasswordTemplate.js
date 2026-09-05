// src/templates/resetPasswordTemplate.js

const resetPasswordTemplate = (fullName, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password - AIKRISHTA</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f5f7fa;
          padding: 40px 20px;
        }
        .container {
          max-width: 560px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          border: 1px solid #e8ecf0;
        }
        .header {
          background: linear-gradient(135deg, #1A2A4A 0%, #0A1528 100%);
          padding: 40px 40px 30px;
          text-align: center;
        }
        .header-logo {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 2px;
        }
        .header-logo span {
          color: #8B1E3F;
        }
        .header-logo .dot {
          color: #C9A96E;
        }
        .content {
          padding: 40px 40px 30px;
        }
        .greeting {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: #1A2A4A;
          margin-bottom: 10px;
        }
        .message {
          font-size: 16px;
          color: #666666;
          line-height: 1.6;
          margin-bottom: 25px;
        }
        .btn-container {
          text-align: center;
          margin: 30px 0;
        }
        .btn {
          display: inline-block;
          padding: 14px 40px;
          background: #8B1E3F;
          color: #FFFFFF !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(139, 30, 63, 0.3);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139, 30, 63, 0.4);
        }
        .footer-text {
          font-size: 14px;
          color: #999999;
          line-height: 1.6;
          margin-top: 20px;
          text-align: center;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px 40px;
          text-align: center;
          border-top: 1px solid #e8ecf0;
        }
        .footer p {
          font-size: 13px;
          color: #999999;
        }
        .footer a {
          color: #8B1E3F;
          text-decoration: none;
        }
        .expiry {
          font-size: 13px;
          color: #999999;
          text-align: center;
          margin-top: 15px;
        }
        .divider {
          height: 1px;
          background: #e8ecf0;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-logo">
            AIKRISHTA<span class="dot">.</span>COM
          </div>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="greeting">Hello ${fullName},</div>

          <p class="message">
            You requested to reset your password for your AIKRISHTA account.
            Click the button below to create a new password.
          </p>

          <div class="btn-container">
            <a href="${resetUrl}" class="btn">Reset Password</a>
          </div>

          <p class="message" style="font-size: 14px; color: #999999; text-align: center;">
            This link will expire in 10 minutes.
          </p>

          <div class="divider"></div>

          <p class="footer-text">
            If you did not request this, please ignore this email.
            <br>Your password will not be changed unless you click the link above.
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>
            © ${new Date().getFullYear()} <a href="http://localhost:3000">AIKRISHTA</a>. All rights reserved.
            <br>Made with ❤️ for meaningful connections.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default resetPasswordTemplate;