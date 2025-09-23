import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    console.log("Admin login route working 🚀");
    console.log(req.body)
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h", // Token expiration time
    });

    res.status(200).json({ token, message: "Admin logged in successfully." });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

