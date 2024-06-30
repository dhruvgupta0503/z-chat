import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import {v4 as uuid} from "uuid";
import { getBase64 } from "../lib/helper.js";
import { v2 as cloudinary } from 'cloudinary';

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const connectDB = (uri) => {
    mongoose.connect(uri, { dbName: "Z-Chat" }).then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            throw err;
        });
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.status(code).cookie("Z-Chat-token", token, cookieOptions).json({
        success: true,
        message,
    });
};

const emitEvent = (req, event, users, data) => {
    console.log("emitting event", event);
};
//import { v2 as cloudinary } from 'cloudinary';
 const uploadFilesToCloudinary = async (files) => {
    try {
        console.log("Starting file upload to Cloudinary...");
        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        console.error("Error uploading to Cloudinary: ", error);
                        return reject(new ErrorHandler("File upload failed"));
                    }
                    console.log("Cloudinary upload result: ", result);
                    resolve(result);
                }).end(file.buffer);
            });
        });
        const results = await Promise.all(uploadPromises);
        console.log("Upload results: ", results);
        return results;
    } catch (error) {
        console.error("Error uploading files to Cloudinary: ", error);
        throw new ErrorHandler("File upload failed");
    }
};

const deleteFilesFromCloudinary= async(public_ids) =>{
    // deleting files
}

export { connectDB, sendToken, cookieOptions, emitEvent,deleteFilesFromCloudinary,uploadFilesToCloudinary };
