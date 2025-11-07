import express from "express";
import {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItemByIdOrName,
  updateItem,
  searchItems,
  deleteItem,
} from "../controllers/itemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createItem);
router.get("/", getAllItems);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/subcategory/:subCategoryId", getItemsBySubCategory);
router.get("/:id", getItemByIdOrName);
router.put("/:id",protect, updateItem);
router.get("/search/:name", searchItems);
router.delete("/:id",protect, deleteItem);

export default router;
