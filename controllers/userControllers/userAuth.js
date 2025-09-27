import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import collecion from "../../config/collection.js";
import connectToDatabase from "../../config/db.js";
import { v7 as uuidv7 } from "uuid";

export const signup = async (req, res) => {
  // console.log("signup>>>>>>>>>");
  // console.log(req.body);
  try {
    const { name, email, password } = req.body;

    // Simple validation instead of Zod
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    const db = await connectToDatabase(process.env.DATABASE);
    const user = await db
      .collection(collecion.USERS_COLLECTION)
      .findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = uuidv7();

    await db.collection(collecion.USERS_COLLECTION).insertOne({
      userId,
      name,
      email,
      password: passwordHash,
      phone: "",
      avatar: "",
      role: "customer",
      addresses: [],
      orders: [],
      wishlist: [],
      cart: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isActive: true,
      isBlocked: false,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  console.log("login>>>>>>>>>");
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // Simple validation instead of Zod
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const db = await connectToDatabase(process.env.DATABASE);
    const user = await db
      .collection(collecion.USERS_COLLECTION)
      .findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "2h", // Token expiration time
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
