import mongoose from "mongoose";

const statueSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    published_at: { type: Date, default: Date.now },
    expires_at: { type: Date }  // expires_at n'est plus requis
});

// Middleware pour définir expires_at 24 heures après published_at, si non défini
statueSchema.pre('save', function (next) {
    if (!this.expires_at) {
        const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
        this.expires_at = new Date(this.published_at.getTime() + oneDay);
    }
    next();
});

const Statue = mongoose.model("Statue", statueSchema);

export default Statue;
