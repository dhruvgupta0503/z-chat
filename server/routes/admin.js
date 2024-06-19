import express from "express";
import { allChats, allUser,allMessages } from "../controllers/admin.js";

const app = express.Router();

app.get("/")

app.get("/verify");

app.get("/logout");

app.get("/users",allUser);

app.get("/chats",allChats);

app.get("/messages",allMessages);

app.get("/stats");


export default app;

