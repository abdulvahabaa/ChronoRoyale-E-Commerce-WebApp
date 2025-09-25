import express from "express";
import { adminLogin } from "../controllers/adminControllers/adminAuth.js";
import {
  adminDashbordPage,
  adminLoginPage,
} from "../controllers/adminControllers/adminController.js";

const adminRoutes = express.Router({ mergeParams: true });

adminRoutes.get("/", adminLoginPage);

adminRoutes.post("/auth/login", adminLogin);

adminRoutes.get("/dashboard", adminDashbordPage);

// adminAuthRoutes.get("/test", (req, res) => {
//     res.status(200).json({ message: "Admin login route working 🚀" });
// });

export default adminRoutes;
