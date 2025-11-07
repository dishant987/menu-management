import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCategory);
router.get("/", getAllCategories);
router.get("/:id", protect, getCategoryByIdOrName);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
