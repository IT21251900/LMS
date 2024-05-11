import nodemailer from 'nodemailer';
import User from '../schemas/user.schema.js';
import log from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();


// Define the function to send notifications to users via email
const sendEmailNotification = async (userId, message) => {
  try {
    // Fetch user details from the database
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Compose email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'CouseraX Courses',
      text: message
    };

    // Send email
    await transporter.sendMail(mailOptions);

    log.info('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error.message);
  }
};

export default sendEmailNotification;
