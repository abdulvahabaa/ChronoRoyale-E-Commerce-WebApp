import express from "express";
import {
  login,
  logout,
  signup,
} from "../controllers/userControllers/userAuth.js";
import {
  landingPage,
  loginPage,
  productsPage,
  signupPage,
} from "../controllers/userControllers/userController.js";
import { productViewPage } from "../controllers/productsControllers/productController.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { redirectIfLoggedIn } from "../middlewares/redirectIfLoggedIn.js";
import { noCache } from "../middlewares/noCache.js";

const userRoutes = express.Router({ mergeParams: true });

// Redirect logged-in users from login/signup
// Login & Signup: redirect if logged in and prevent cached pages
userRoutes.get("/login", noCache, redirectIfLoggedIn, loginPage);
userRoutes.get("/signup", noCache, redirectIfLoggedIn, signupPage);

// Auth actions
userRoutes.post("/login-user", login);
userRoutes.post("/signup-user", signup);
userRoutes.get("/logout", logout);

// Public pages
userRoutes.get("/", landingPage);
userRoutes.get("/products", productsPage);
userRoutes.get("/products/:id", productViewPage);

// Private pages
userRoutes.get("/profile", requireAuth, (req, res) => {
  res.render("user/profile", {
    title: "Your Profile",
    loggedInUser: req.loggedInUser,
  });
});

export default userRoutes;
