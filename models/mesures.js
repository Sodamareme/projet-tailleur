import mongoose from 'mongoose';

const mesureSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    // Common measurements
    shoulder: { type: Number, required: true },
    chest: { type: Number, required: true },
    waist: { type: Number, required: true },
    hips: { type: Number, required: true },
    // Additional measurements for men
    sleeveLength: { type: Number },
    neck: { type: Number },
    // Additional measurements for women
    bust: { type: Number },
    inseam: { type: Number }
    // Timestamps
});



const Mesure = mongoose.model('Mesure', mesureSchema);

export default Mesure;