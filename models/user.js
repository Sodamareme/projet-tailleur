import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: [true, 'Email address is required'], unique: true },
    password: {type: String, required: true, minLength: 6},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    roles: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
    ]
});

const User = mongoose.model('User', userSchema);

export default User;