import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { verifyUser } from "./middlewares/verifyUser.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Add for admin assets
app.use(
  "/adminAssets",
  express.static(path.join(__dirname, "public/adminAssets"))
);

// Add for user assets
app.use(
  "/userAssets",
  express.static(path.join(__dirname, "public/userAssets"))
);

// Apply user verification before user routes
app.use((req, res, next) => {
  // Skip for admin routes
  if (req.originalUrl.startsWith("/admin")) return next();

  verifyUser(req, res, () => {
    // Make logged-in user available globally in all HBS views
    res.locals.loggedInUser = req.loggedInUser;
    next();
  });
});

/* ROUTES */
app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(
    `process ID ${process.pid}:server running on PORT ${PORT} in dev mode`
  );
});

/* VIEW ENGINE SETUP */
app.engine(
  "hbs",
  engine({
    extname: ".hbs", // use .hbs extension
    defaultLayout: "user", // default layout file (user.hbs)
    layoutsDir: path.join(__dirname, "views/layouts"), // layouts folder
    partialsDir: path.join(__dirname, "views/partials"), // partials folder
    helpers: {
      // custom helpers for production scaling
      upper: (str) => str.toUpperCase(),
      json: (context) => JSON.stringify(context),
      eq: (a, b) => a === b,
      or: (a, b) => a || b,
      formatDate: (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-GB"); // dd/mm/yyyy
      },
    },
  })
);

// set view engine
app.set("view engine", "hbs");
// set views folder
app.set("views", path.join(__dirname, "views"));
