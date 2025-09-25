import express from "express";
import { login, signup } from "../controllers/userControllers/userAuth.js";
import { landingPage } from "../controllers/userControllers/userController.js";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/", landingPage);

userRoutes.get("/home", signup);

export default userRoutes;
