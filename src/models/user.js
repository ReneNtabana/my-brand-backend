import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 8
        },
        isAdmin: {
            type: Boolean,              
            required: true
        }  // admin can be false or true
    },
    {
        timestamps: true                                       
    }
)

const User = mongoose.model("User", userSchema)

export default User