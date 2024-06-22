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







const app = express();

const server=createServer(app)
const io=new Server(server,{})


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