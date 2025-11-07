import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryByIdOrName,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createSubCategory);
router.get("/", getAllSubCategories);
router.get("/category/:categoryId", getSubCategoriesByCategory);
router.get("/:id", getSubCategoryByIdOrName);
router.put("/:id",protect, updateSubCategory);
router.delete("/:id",protect, deleteSubCategory);


export default router;
