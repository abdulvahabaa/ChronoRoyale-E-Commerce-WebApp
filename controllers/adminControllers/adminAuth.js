// controllers/adminControllers/adminAuth.js
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  // console.log("Admin login function working 🚀");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("admin/adminLogin", {
        layout: "admin",
        title: "Admin Login",
        error: "Email and password are required.",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.render("admin/adminLogin", {
        layout: "admin",
        title: "Admin Login",
        error: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // console.log("Admin token:", token);

    // store token in cookie for future auth
    res.cookie("adminToken", token, { httpOnly: true });

    // redirect to dashboard with success message in query
    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Login Error:", err.message);
    res.render("admin/adminLogin", {
      layout: "admin",
      title: "Admin Login",
      error: "Internal server error",
    });
  }
};
