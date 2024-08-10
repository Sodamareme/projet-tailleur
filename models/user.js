import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: [true, 'Email address is required'], unique: true },
    password: {type: String, required: true, minLength: 6},
    lastname: {type: String, required: true},
    firstname: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //les personnes que tu as suivi // abonnement
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    //status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Statue' }],
    //notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }] 
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    UserBlocked: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    status: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Statue' }]


    //les personnes que t'ont suivi // abonné

});

const User = mongoose.model('User', userSchema);

export default User;
