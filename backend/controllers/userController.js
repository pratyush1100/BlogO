import { User } from "../models/userSchema.js"
import jwt from "jsonwebtoken"
export const register = async (req, res, next) => {
    try {
        const {
            name, email, phone, password, confirmPassword,
        } = req.body;


        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        if (confirmPassword !== password) {
            return res.status(400).json({
                success: false,
                message: "Confirm Password and Password do not match."
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }
        const userData = {
            name, email, phone, password, confirmPassword,
        }

        await User.create(userData);

        return res.status(201).json({
            success: true,
            message: "User Created Successfully.",
            user: {
                name, email, phone
            }
        })

    } catch (error) {
        console.log("Error in the register function.", error);
        return res.status(500).json({
            success: false,
            message: "Internal server Error. "
        })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials!!"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({
                success: false,
                message: "Invalid Credentials!!"
            })
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials. "
            })
        }
        const token = await user.generateAuthToken();

        return res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        }).json({
            success: true,
            message: "User LoggedIn Successfull.",
        })

    } catch (error) {
        console.log("Error occurred during logging : ", error)
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User is not Logged In."
            })
        }
        return res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            .json({
                success: true,
                message: "Logged Out Successfully. "
            })
    } catch (error) {
        console.log("Error at Logout : ", error);
        next();
    }
}

export const getUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User is not Authorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error at getUser : ", error);
        next(error);

    }
}


export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error fetching user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
