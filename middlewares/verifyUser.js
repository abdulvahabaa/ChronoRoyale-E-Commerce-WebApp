import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token; // user token
    if (!token) {
      req.loggedInUser = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.loggedInUser = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("User token verification failed:", err.message);
    req.loggedInUser = null;
    next();
  }
};
