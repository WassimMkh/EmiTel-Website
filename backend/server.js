import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import formRoutes from "./routes/formRoutes.js";
import { securityMiddleware } from "./middleware/security.js";

dotenv.config();
const app = express();


app.set("trust proxy", 1);


app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());


const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed by server"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.options("*", cors());

securityMiddleware(app);


const MONGO_URI = process.env.ATLAS_URI;
if (!MONGO_URI) {
  console.error("Missing ATLAS_URI in environment");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });


app.use("/api/NewMembers", formRoutes);


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
