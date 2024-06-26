import express from "express";
import {v4 as uuid} from 'uuid';
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import {createServer} from 'http';
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import { createUser } from "./seeders/user.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSGAGE } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { v2 as cloudinary} from 'cloudinary' 
import cors from 'cors';
dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
 const envMode=process.env.NODE_ENV.trim()||"PRODUCTION";
 const adminSecretKey=process.env.ADMIN_SECRET_KEY || "zeba";
const userSocketIDs= new Map();

// Connect to the database
connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});







const app = express();

const server=createServer(app)
const io=new Server(server,{})


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174",process.env.CLIENT_URL],
    credentials: true,
}));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/chat', chatRoute);

app.use('/api/v1/admin',adminRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.use((socket,next)=>{})

io.on("connection",(socket)=>{
    
    const user={
        _id:"dfvs",
        name:"giggles",
    };
    userSocketIDs.set(user._id.toString(),socket.id);
    console.log(userSocketIDs);

    socket.on(NEW_MESSGAGE,async({chatId,members,message})=>{
        const messageForRealTime = {
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        };

        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId,
        };
        
        const membersSocket= getSockets(members);
        io.to(membersSocket).emit(NEW_MESSGAGE,{
            chatId,
            message:messageForRealTime
        });
        io.to(membersSocket).emit(NEW_MESSGAGE_ALERT,{chatId});

        

        //console.log("New Message",messageForRealTime);
        try{
            await Message.create(messageForDB); 
        }catch(error){
            console.log(error);

        }
    })



    socket.on("disconnect",()=>{
        console.log("user disconnected");
        userSocketIDs.delete(user._id.toString());
    });
});


app.use(errorMiddleware);


// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port} in${envMode}MODE `);
});

export {envMode,adminSecretKey,userSocketIDs}