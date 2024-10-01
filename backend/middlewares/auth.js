import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User is not Authenticated."
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token, authorization denied.' });
        }
        req.user = user;
        req.token = token;
        req.userId = user._id;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ success: false, message: 'Internal Server Error.' });
    }
}