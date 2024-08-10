import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const generateToken = (userId) =>{
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const sendMail = async (to, subject, message) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_GOOGLE_APP,
        pass: process.env.PASSWORD_GOOGLE_APP
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_GOOGLE_APP,
      to: to,
      subject: subject,
      text: message
    };

    return transporter.sendMail(mailOptions);
  }

export { hashPassword, generateToken, sendMail};