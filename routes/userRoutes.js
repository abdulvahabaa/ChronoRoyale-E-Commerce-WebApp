import express from "express";
import { login, signup } from "../controllers/userControllers/userAuth.js";
import { landingPage, loginPage, productsPage, signupPage } from "../controllers/userControllers/userController.js";
import { productViewPage } from "../controllers/productsControllers/productController.js";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/", landingPage);

userRoutes.get("/login", loginPage);

userRoutes.get("/signup", signupPage);

userRoutes.get("/products", productsPage);

userRoutes.get("/products/:id", productViewPage);

export default userRoutes;
