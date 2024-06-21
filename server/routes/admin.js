import express from "express";
import { allChats, allUser,allMessages, getDashboardStats, adminLogin, adminLogout, getAdminData } from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/Auth.js";

const app = express.Router();

app.get("/verify",adminLoginValidator(),validateHandler,adminLogin);

app.get("/logout",adminLogout);


//only admin can access these routes

app.use(adminOnly)

app.get("/",getAdminData)



app.get("/users",allUser);

app.get("/chats",allChats);

app.get("/messages",allMessages);

app.get("/stats",getDashboardStats);


export default app;

