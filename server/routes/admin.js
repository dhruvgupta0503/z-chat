import express from "express";
import { allChats, allUser,allMessages, getDashboardStats, adminLogin } from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

app.get("/")

app.get("/verify",adminLoginValidator(),validateHandler,adminLogin);

app.get("/logout");

app.get("/users",allUser);

app.get("/chats",allChats);

app.get("/messages",allMessages);

app.get("/stats",getDashboardStats);


export default app;

