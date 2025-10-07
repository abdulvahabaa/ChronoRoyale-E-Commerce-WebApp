import express from "express";
import { login, signup } from "../controllers/userControllers/userAuth.js";
import {
  landingPage,
  loginPage,
  productsPage,
  signupPage,
} from "../controllers/userControllers/userController.js";
import { productViewPage } from "../controllers/productsControllers/productController.js";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/login", loginPage);

userRoutes.post("/login-user", login);

userRoutes.get("/signup", signupPage);

userRoutes.post("/signup-user", signup);

userRoutes.get("/", landingPage);

userRoutes.get("/products", productsPage);

userRoutes.get("/products/:id", productViewPage);

export default userRoutes;
