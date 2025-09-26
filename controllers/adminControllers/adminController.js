import collecion from "../../config/collection.js";
import connectToDatabase from "../../config/db.js";

export const adminLoginPage = async (req, res) => {
  console.log("Admin dashboard route working 🚀");
  res.render("admin/adminLogin", { layout: "admin", title: "Admin Login" });
};
export const adminDashbordPage = async (req, res) => {
  console.log("Admin dashboard route working 🚀");
  // const { success } = req.query; // if success=1 show toast
  res.render("admin/dashboard", {
    layout: "admin",
    title: "Admin Dashboard",
    // success: success ? "Login successful!" : null,
  });
};

export const adminUsersListPage = async (req, res) => {
  // console.log("Admin UserstList route working 🚀");
  try {
    const db = await connectToDatabase(process.env.DATABASE);

    let usersData = await db
      .collection(collecion.USERS_COLLECTION)
      .find({})
      .toArray();

    // format createdAt before sending to HBS
    usersData = usersData.map((user) => {
      return {
        ...user,
        createdAtFormatted: new Date(user.createdAt).toLocaleDateString(
          "en-GB"
        ), // dd/mm/yyyy
      };
    });

    // console.log("userData:", usersData);

    res.render("admin/users-list", {
      layout: "admin",
      title: "Admin - Users List",
      usersData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.render("admin/users-list", {
      layout: "admin",
      title: "Admin - Users List",
      usersData: [],
    });
  }
};

export const adminAddProductPage = async (req, res) => {
  console.log("Admin AddProduct route working 🚀");
  res.render("admin/add-product", {
    layout: "admin",
    title: "Admin - Add Product",
  });
};

export const adminProductsListPage = async (req, res) => {
  console.log("Admin ProductsList route working 🚀");
  res.render("admin/products-list", {
    layout: "admin",
    title: "Admin - Products List",
  });
};

export const adminOrdersListPage = async (req, res) => {
  console.log("Admin OrdersList route working 🚀");
  res.render("admin/orders-list", {
    layout: "admin",
    title: "Admin - Orders List",
  });
};

export const adminOrderViewPage = async (req, res) => {
  console.log("Admin OrderView route working 🚀");
  res.render("admin/order-view", {
    layout: "admin",
    title: "Admin - Order View",
  });
};

