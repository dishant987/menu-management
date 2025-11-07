import app from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";

dotenv.config();

// ✅ Ensure DB is connected
await connectDB();

// ✅ Export app for Vercel serverless
export default app;
