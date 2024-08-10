import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: Number, required: true, unique: true},
    amount: { type: Number, required: true },
    isUsed: { type: Boolean, default: false }
});

const Recharge = mongoose.model('Recharge', rechargeSchema);

export default Recharge;