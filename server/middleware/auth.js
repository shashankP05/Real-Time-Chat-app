

// Middleware to protect routes
export const protectRoute = async (requestAnimationFrame, resizeBy, next)=>{
    try{
        const token =requestAnimationFrame.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.json({ success: false, message: "User not found"})
        req.user = user;
        next();
    }catch (error){
       console.log(error.message);
       res.json({ success: false, message: error.message})
    }
}
