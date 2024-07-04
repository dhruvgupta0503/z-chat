import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies["Z-chat-token"];
    if (!token) {
        return next(new ErrorHandler("Please login to access this route", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData._id;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token, authorization denied", 401));
    }
});

const adminOnly = (req, res, next) => {
    const token = req.cookies["z-chat-admin-token"];
    if (!token) {
        return next(new ErrorHandler("Only Admin can access this route", 401));
    }

    try {
        const secretKey = jwt.verify(token, process.env.JWT_SECRET);
        const isMatched = secretKey === adminSecretKey;
        if (!isMatched) return next(new ErrorHandler("Only Admin can access this route", 401));
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid admin token, authorization denied", 401));
    }
};

export { isAuthenticated, adminOnly };
