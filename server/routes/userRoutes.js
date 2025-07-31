import express from "express";
import { signup, login, updateProfile, checkAuth } from "../controllers/userController.js"; //  Add missing imports
import { protectRoute } from "../middleware/auth.js"; //  Add middleware import

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check-auth", protectRoute, checkAuth);



export default userRouter;