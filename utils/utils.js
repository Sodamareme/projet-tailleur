import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const generateToken = (userId) =>{
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export { hashPassword, generateToken };