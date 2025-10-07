import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import collection from "../../config/collection.js";
import connectToDatabase from "../../config/db.js";
import { v7 as uuidv7 } from "uuid";

export const signup = async (req, res) => {
  console.log("signup>>>>>>>>>", req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("user/signup", {
        title: "Signup - ChronoRoyale",
        error: "Name, email, and password are required.",
      });
    }

    const db = await connectToDatabase(process.env.DATABASE);
    const user = await db
      .collection(collection.USERS_COLLECTION)
      .findOne({ email });

    if (user) {
      return res.render("user/signup", {
        title: "Signup - ChronoRoyale",
        error: "User already exists. Please login instead.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = uuidv7();

    await db.collection(collection.USERS_COLLECTION).insertOne({
      userId,
      name,
      email,
      password: passwordHash,
      phone: "",
      avatar: "",
      addresses: [],
      orders: [],
      wishlist: [],
      cart: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      isBlocked: false,
    });

    // ✅ Redirect on success
    res.redirect("/login");
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.render("user/signup", {
      title: "Signup - ChronoRoyale",
      error: "Something went wrong. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  console.log("login>>>>>>>>>", req.body);
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.render("user/login", {
        title: "Login - ChronoRoyale",
        error: "Email and password are required.",
      });
    }

    const db = await connectToDatabase(process.env.DATABASE);
    const user = await db
      .collection(collection.USERS_COLLECTION)
      .findOne({ email });

    if (!user) {
      return res.render("user/login", {
        title: "Login - ChronoRoyale",
        error: "User does not exist. Please sign up first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("user/login", {
        title: "Login - ChronoRoyale",
        error: "Invalid credentials. Please try again.",
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    // Generate token
    const token = jwt.sign(
      { id: user.userId, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" } // keep user logged in for 2 days
    );

    // store token in a cookie for session
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect("/");
  } catch (err) {
    console.error("Login Error:", err.message);
    res.render("user/login", {
      title: "Login - ChronoRoyale",
      error: "Something went wrong. Please try again later.",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
