import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryByIdOrName,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getAllSubCategories);
router.get("/category/:categoryId", getSubCategoriesByCategory);
router.get("/:id", getSubCategoryByIdOrName);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);


export default router;
