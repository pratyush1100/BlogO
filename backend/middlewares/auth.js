import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Check if token exists in cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated. No token found.",
            });
        }

        // Verify token and decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find the user by decoded ID
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token, authorization denied.",
            });
        }

        // Attach user and token info to the request object
        req.user = user;
        req.token = token;
        req.userId = user._id;

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        // Check if the error is due to token expiration or invalid signature
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired, please log in again.",
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token, authorization denied.",
            });
        }

        // Generic error handling
        console.error("Authentication error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};
