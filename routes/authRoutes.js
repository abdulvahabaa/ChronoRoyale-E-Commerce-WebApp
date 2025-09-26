import express from "express";
import { login, signup } from "../controllers/userControllers/userAuth.js";

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

// authRoutes.get("/test", (req, res) => {
//   res.status(200).json({ message: "Auth route working 🚀" });
// });

export default authRoutes;
