import express from "express";
import { acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, newUser,searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/Auth.js";
import { registerValidator,validateHandler,loginValidator, sendRequestValidator, acceptRequestValidator } from "../lib/validators.js";

const router = express.Router();

// Middleware to log when the login route is hit
router.post("/login", (req, res, next) => {
    console.log("Login route hit");
    next();
}, loginValidator(),validateHandler,login);

// Route for creating a new user
router.post("/new", singleAvatar,registerValidator(),validateHandler, newUser);

// User must be logged in to access this route
router.use(isAuthenticated);

router.get("/me", getMyProfile);

router.get("/logout",isAuthenticated, logout);

router.get("/search",searchUser);

router.put("/sendrequest",sendRequestValidator(),validateHandler,sendFriendRequest);

router.put("/accept-request",acceptRequestValidator(),validateHandler,acceptFriendRequest);


router.get("/notifications",getMyNotifications);


router.get("/friends",getMyFriends);


export default router;

