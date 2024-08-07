import User from "../models/user.js";
import Role from "../models/role.js";
import { hashPassword, generateToken } from "../utils/utils.js";
import bcrypt from 'bcryptjs';

const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword, lastname, firstname, phoneNumber, address, roles } = req.body;
        
        const roleFromDB = await Role.find({ name: { $in: roles } });

        if (!roleFromDB.length) {
            return res.status(400).json({ message: 'No roles found', status: false });
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match', status: false });
        }

        const hashedPassword = hashPassword(password);

        // Create new user with roles
        const newUser = new User({
            email,
            password: hashedPassword,
            lastname,
            firstname,
            phoneNumber,
            address,
            roles: roleFromDB.map(role => role._id)
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Error while creating user', error, status: false });
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;

    if(email === ''){
        return res.status(400).json({ message: 'Email is required', status: false });
    }

    if(password === ''){
        return res.status(400).json({ message: 'Password is required', status: false });
    }

    const user = await User.findOne({ email});

    if(user && await bcrypt.compare(password, user.password)){
        const token = generateToken(user._id);

        // Convert the Mongoose document to a plain JavaScript object
        const userObject = user.toObject();

        // Add the token to the plain object
        userObject.token = token;

        return res.status(200).json({ message: 'User logged in successfully', user: userObject, status: true });
    }else {
        return res.status(404).json({ message: 'Incorrect email or password', status: false });
    }
};

export { createUser, login };
