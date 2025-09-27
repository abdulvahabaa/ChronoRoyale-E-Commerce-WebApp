import express from "express";
import {
  adminLogin,
  adminLogout,
} from "../controllers/adminControllers/adminAuth.js";
import {
  adminAddProductPage,
  adminDashbordPage,
  adminLoginPage,
  adminOrdersListPage,
  adminOrderViewPage,
  adminProductsListPage,
  adminUsersListPage,
} from "../controllers/adminControllers/adminController.js";
import { blockUnblockUser } from "../controllers/userControllers/userController.js";

const adminRoutes = express.Router({ mergeParams: true });

adminRoutes.get("/", adminLoginPage);

adminRoutes.post("/auth/login", adminLogin);

adminRoutes.get("/logout", adminLogout);

adminRoutes.get("/dashboard", adminDashbordPage);

adminRoutes.get("/users-list", adminUsersListPage);

adminRoutes.post("/block-user/:id", blockUnblockUser);

adminRoutes.get("/add-product", adminAddProductPage);

adminRoutes.get("/products-list", adminProductsListPage);

adminRoutes.get("/orders-list", adminOrdersListPage);

adminRoutes.get("/order-view", adminOrderViewPage);

// adminAuthRoutes.get("/test", (req, res) => {
//     res.status(200).json({ message: "Admin login route working 🚀" });
// });

export default adminRoutes;
