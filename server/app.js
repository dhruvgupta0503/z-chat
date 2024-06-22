import express from "express";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import { createUser } from "./seeders/user.js";
import adminRoute from "./routes/admin.js";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const envMode=process.env.NODE_ENV.trim()||"PRODUCTION";
export const adminSecretKey=process.env.ADMIN_SECRET_KEY || "zeba";

// Connect to the database
connectDB(mongoURI);







const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/user', userRoute);
app.use('/chat', chatRoute);

app.use('/admin',adminRoute)

app.get("/", (req, res) => {
    res.send("Hello World");
});
    app.use(errorMiddleware);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port} in${envMode}MODE `);
});
