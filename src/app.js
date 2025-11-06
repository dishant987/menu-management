import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/items", itemRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Menu Management API is running...");
});

export default app;
