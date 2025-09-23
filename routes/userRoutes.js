import express from "express";
import { login, signup } from "../controllers/userControllers/userAuth.js";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/home", signup);

export default userRoutes;