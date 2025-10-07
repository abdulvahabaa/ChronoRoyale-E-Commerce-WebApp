import jwt from "jsonwebtoken";

/**
 * Middleware to protect routes that require authentication.
 * It checks for a JWT token in cookies and validates it.
 * If valid, it attaches the user info to req.loggedInUser.
 * If invalid or missing, it redirects the user to /login.
 */
export const requireAuth = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;

    // 2️⃣ If no token → user is not logged in
    if (!token) {
      return res.redirect("/login");
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user info to request for use in routes or HBS templates
    req.loggedInUser = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    // 5️⃣ Continue to the next middleware / route handler
    next();
  } catch (err) {
    console.error("Authentication failed:", err.message);

    // 6️⃣ Optional: clear invalid token
    res.clearCookie("token");

    // 7️⃣ Redirect to login page
    return res.redirect("/login");
  }
};
