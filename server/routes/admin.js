import express from "express";
import {
  allChats,
  allUser,
  allMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/Auth.js";

const app = express.Router();

// right now you are using every route only once, but in some cases you will have to use a single route more than once
// eg. app.get("/chat") will give chat app.post("/chat") will create a chat so in that scenerio you can use
//
// you can add as many middleware as you like the only thing changed here is the syntax all other things are same
// app.route("/chat").get(middleware, controller).post(middleware, controller)

app.get("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

//only admin can access these routes

app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", allUser);

app.get("/chats", allChats);

app.get("/messages", allMessages);

app.get("/stats", getDashboardStats);

export default app;
