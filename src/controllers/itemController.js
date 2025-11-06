import Item from "../models/Item.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import mongoose from "mongoose";

// CREATE ITEM UNDER CATEGORY OR SUBCATEGORY
export const createItem = async (req, res) => {
  try {
    const {
      category_id,
      sub_category_id,
      name,
      image,
      description,
      tax_applicable,
      tax,
      base_amount,
      discount,
    } = req.body;

    if (!category_id && !sub_category_id) {
      return res
        .status(400)
        .json({ message: "Provide category or sub-category ID" });
    }

    // Verify parent existence
    if (category_id && !(await Category.findById(category_id))) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (sub_category_id && !(await SubCategory.findById(sub_category_id))) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    const total_amount = base_amount - (discount || 0);

    const item = new Item({
      category_id,
      sub_category_id,
      name,
      image,
      description,
      tax_applicable,
      tax,
      base_amount,
      discount,
      total_amount,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error creating item", error });
  }
};

// GET ALL ITEMS (with pagination)
export const getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (limit > 100) {
      return res.status(400).json({ message: "Limit cannot exceed 100" });
    }

    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Page number must be at least 1" });
    }

    const total = await Item.countDocuments();
    const items = await Item.find()
      .populate("category_id", "name")
      .populate("sub_category_id", "name")
      .skip(skip)
      .limit(limit);

    res.status(200).json({ total, page, limit, data: items });
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// GET ITEMS BY CATEGORY
export const getItemsByCategory = async (req, res) => {
  try {
    const items = await Item.find({ category_id: req.params.categoryId });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items by category", error });
  }
};

// GET ITEMS BY SUBCATEGORY
export const getItemsBySubCategory = async (req, res) => {
  try {
    const items = await Item.find({
      sub_category_id: req.params.subCategoryId,
    });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items by sub-category", error });
  }
};

// GET ITEM BY ID OR NAME
export const getItemByIdOrName = async (req, res) => {
  try {
    const param = decodeURIComponent(req.params.id); // decode %20 -> space
    let query = [];

    // If it's a valid ObjectId, search by _id
    if (mongoose.Types.ObjectId.isValid(param)) {
      query.push({ _id: param });
    }

    // Match name (case-insensitive and exact)
    query.push({ name: { $regex: `^${param}$`, $options: "i" } });

    const item = await Item.findOne({ $or: query });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Error fetching item", error });
  }
};

// UPDATE ITEM
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

// SEARCH ITEM BY NAME
export const searchItems = async (req, res) => {
  try {
    const name = req.params.name;
    const items = await Item.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error searching items", error });
  }
};
