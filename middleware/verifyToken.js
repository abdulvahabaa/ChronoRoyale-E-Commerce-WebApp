import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).send("Access Token Denied");
    }

    if (token.startsWith("Bearer ")) {
      const extractedToken = token.slice(7).trimLeft();

      try {
        const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);

        req.user = verified;
        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Access Token Expired" });
        }
        throw err;
      }
    } else {
      return res.status(403).send("Access Token Denied");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};