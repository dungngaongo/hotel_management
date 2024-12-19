import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    console.log("Bypassing token verification.");
    next();
};

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if (err) {
            return next(err); 
        }

        // if user id inside JWT is equal to id send by client
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        
        return next(createError(403, "Bạn không có quyền!"));
    });
};


export const verifyAdmin = (req, res, next) => {
    console.log("Bypassing admin verification.");
    next();
};

export const skipAuth = (req, res, next) => {
    console.log("Skipping authentication for development.");
    req.user = { id: 100, isAdmin: true }; 
    next();
};