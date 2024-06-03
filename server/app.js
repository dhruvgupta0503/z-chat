import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Connect to the database
connectDB(mongoURI);

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
