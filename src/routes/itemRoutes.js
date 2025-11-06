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

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/subcategory/:subCategoryId", getItemsBySubCategory);
router.get("/:id", getItemByIdOrName);
router.put("/:id", updateItem);
router.get("/search/:name", searchItems);
router.delete("/:id", deleteItem);

export default router;
