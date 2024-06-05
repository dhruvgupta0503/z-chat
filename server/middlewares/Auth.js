import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies["Z-Chat-token"];
        if (!token) {
            return next(new ErrorHandler("Please login to access this route", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData._id;

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token, please login again", 401));
    }
};

export { isAuthenticated };
