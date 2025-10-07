import connectToDatabase from "../../config/db.js";
import collection from "../../config/collection.js";
import { ObjectId } from "mongodb";
import { bannerData, brandData } from "../../data/index.js";
import { getProductsData } from "../productsControllers/productController.js";
import { signup } from "./userAuth.js";
export const landingPage = async (req, res) => {
  console.log("User Landing route working 🚀");

  try {
    // Featured random products (6)
    const featuredProducts = await getProductsData({
      sort: "random",
      limit: 12,
    });

    console.log(featuredProducts[0])

    // Latest men’s watches (4)
    const latestMen = await getProductsData({
      category: "men",
      sort: "latest",
      limit: 10,
    });

    // Latest women’s watches (4)
    const latestWomen = await getProductsData({
      category: "women",
      sort: "latest",
      limit: 10,
    });

    const newArrivals = await getProductsData({
      sort: "latest",
      limit: 15,
    });

    // Render homepage with dynamic products
    res.render("user/home", {
      title: "Home - ChronoRoyale",
      banners: bannerData,
      brands: brandData,
      featured: featuredProducts,
      men: latestMen,
      women: latestWomen,
      newProducts: newArrivals,
    });
  } catch (error) {
    console.error("❌ Landing page error:", error);
    res.status(500).send("Error loading home page");
  }
};

export const loginPage = async (req, res) => {
  console.log(" Login page route working 🚀");

  res.render("user/login", { title: "Login - ChronoRoyale" });
};

export const signupPage = async (req, res) => {
  console.log("Signup page route working 🚀");

  try {

    
    signup
     res.render("user/signup", { title: "Signup - ChronoRoyale" });
  } catch (error) {
    console.log(error);
  }

 
};
export const productsPage = async (req, res) => {
  console.log("productsPage page route working 🚀");

  res.render("user/products", { title: "Product's List - ChronoRoyale" });
};

export const blockUnblockUser = async (req, res) => {
  console.log("Block/Unblock User route working 🚀");

  console.log(req.params.id);
  console.log(req.query.status);
  try {
    const db = await connectToDatabase(process.env.DATABASE);
    const userId = req.params.id; // user id from params
    const { status } = req.query; // status from query true/false

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const isBlock = status === "true"; // convert query string to boolean

    // Prepare update data (no blockedAt)
    const updateData = {
      isBlocked: isBlock,
      isActive: !isBlock,
      updatedAt: new Date(),
    };

    const result = await db
      .collection(collection.USERS_COLLECTION)
      .updateOne({ _id: new ObjectId(userId) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // res.status(200).json({
    //   message: isBlock ? "User blocked successfully" : "User unblocked successfully",
    // });

    res.redirect("/admin/users-list");
  } catch (error) {
    console.error("Block/Unblock User Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
