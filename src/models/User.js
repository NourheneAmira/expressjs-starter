import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema(
    { 
        name: String,
        email:  {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: String,
        role: {
            type: [String],
            default: ["Subscriber"],
            enum: ["Subscriber", "Instructor", "Admin"],
        },
        stripe_account_id: "",
        stripe_seller: {},
        stripeSession: {}
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema)

export default User