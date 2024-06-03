import express from "express";
import { login, newUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";

const router = express.Router();

// Middleware to log when the login route is hit,was getting a problem with the login route so did this to see if the code is being read or not 
router.post("/login", (req, res, next) => {
    console.log("Login route hit");
    next();
}, login);

// Route for creating a new user
router.post("/new", singleAvatar, newUser);
  
export default router;
