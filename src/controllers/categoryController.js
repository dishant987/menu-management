import mongoose from "mongoose";
import Category from "../models/Category.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, image, description, tax_applicable, tax, tax_type } =
      req.body;

    // Prevent duplicate categories
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      image,
      description,
      tax_applicable,
      tax,
      tax_type,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// GET ALL CATEGORIES (with pagination)
export const getAllCategories = async (req, res) => {
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

    const total = await Category.countDocuments();
    const categories = await Category.find().skip(skip).limit(limit);

    res.status(200).json({ total, page, limit, data: categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// GET CATEGORY BY ID OR NAME
export const getCategoryByIdOrName = async (req, res) => {
  try {
    const param = req.params.id;

    let query = [];

    // If it's a valid ObjectId, se arch by _id
    if (mongoose.Types.ObjectId.isValid(param)) {
      query.push({ _id: param });
    }

    // Always include name-based search
    query.push({ name: { $regex: `^${param}$`, $options: "i" } });

    const category = await Category.findOne({ $or: query });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
