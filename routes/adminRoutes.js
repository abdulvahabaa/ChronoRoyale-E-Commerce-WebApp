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
import { addProduct } from "../controllers/productsControllers/productController.js";
import { uploadFiles } from "../middleware/uploadMiddleware.js";

const adminRoutes = express.Router({ mergeParams: true });

adminRoutes.get("/", adminLoginPage);

adminRoutes.post("/auth/login", adminLogin);

adminRoutes.get("/logout", adminLogout);

adminRoutes.get("/dashboard", adminDashbordPage);

adminRoutes.get("/users-list", adminUsersListPage);

adminRoutes.post("/block-user/:id", blockUnblockUser);

adminRoutes.get("/add-product", adminAddProductPage);

adminRoutes.post(
  "/add-product",
  uploadFiles("userAssets/pictures", "multiple", "productImages", 4),
  addProduct
);

adminRoutes.get("/products-list", adminProductsListPage);

adminRoutes.get("/orders-list", adminOrdersListPage);

adminRoutes.get("/order-view", adminOrderViewPage);

// adminRoutes.post(
//   "/add-product",
//   uploadFiles("adminAssets/uploads", "fields", null, null, [
//     { name: "thumbnail", maxCount: 1 },
//     { name: "images", maxCount: 4 },
//   ]),
//   addProduct
// );

// adminAuthRoutes.get("/test", (req, res) => {
//     res.status(200).json({ message: "Admin login route working 🚀" });
// });

export default adminRoutes;
