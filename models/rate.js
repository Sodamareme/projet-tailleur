import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: function(v) {
                return v % 0.5 === 0;
            },
            message: props => `${props.value} is not a valid star rating!`
        }
    },
    
    description: {
        type: String,
        required: function() {
            return this.stars <= 2;
        }
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},

 { timestamps: true });

const Rate = mongoose.model('Rate', rateSchema);

export default Rate;
