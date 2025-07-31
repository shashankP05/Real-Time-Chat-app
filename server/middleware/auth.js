import jwt from 'jsonwebtoken'; // ✅ Add jwt import
import User from '../models/User.js'; // ✅ Add User import

// Middleware to protect routes
export const protectRoute = async (req, res, next) => { // ✅ Fix parameter names
    try {
        const token = req.headers.token; // ✅ Fix variable name
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" }); // ✅ Fix res reference
        }
        
        req.user = user; // ✅ Fix req reference
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ success: false, message: "Invalid token" }); // ✅ Fix res reference
    }
}