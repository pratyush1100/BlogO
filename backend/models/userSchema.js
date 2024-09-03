import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name can not exceed 30 characters"],
    },
    email: {
        type: String,
        required: true,
        validator: [validator.isEmail, "Please provide valid email."]
    },
    phone: {
        type: Number,
        // required: true,
    },

    password: {
        type: String,
        required: true,
    },
})


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
}

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);

        return token;
    } catch (error) {
        console.log("Error at userSchema jwt method.");
    }
}

export const User = mongoose.model("User", userSchema)