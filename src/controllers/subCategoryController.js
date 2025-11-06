import SubCategory from "../models/SubCategory.js";
import Category from "../models/Category.js";

// CREATE SUBCATEGORY UNDER A CATEGORY
export const createSubCategory = async (req, res) => {
  try {
    const { category_id, name, image, description, tax_applicable, tax } =
      req.body;

    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ message: "Parent category not found" });
    }

    // Use category defaults if not provided
    const subCategory = new SubCategory({
      category_id,
      name,
      image,
      description,
      tax_applicable: tax_applicable ?? category.tax_applicable,
      tax: tax ?? category.tax,
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating sub-category", error });
  }
};

// GET ALL SUBCATEGORIES (with pagination)
export const getAllSubCategories = async (req, res) => {
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

    const total = await SubCategory.countDocuments();
    const subcategories = await SubCategory.find()
      .populate("category_id", "name")
      .skip(skip)
      .limit(limit);

    res.status(200).json({ total, page, limit, data: subcategories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// GET ALL SUBCATEGORIES UNDER A CATEGORY
export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({
      category_id: req.params.categoryId,
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

// GET SUBCATEGORY BY ID OR NAME
export const getSubCategoryByIdOrName = async (req, res) => {
  try {
    const param = req.params.id;
    const subCategory = await SubCategory.findOne({
      $or: [{ _id: param }, { name: { $regex: param, $options: "i" } }],
    }).populate("category_id", "name");

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub-category", error });
  }
};

// UPDATE SUBCATEGORY
export const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!subCategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating sub-category", error });
  }
};

// DELETE SUBCATEGORY
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory)
      return res.status(404).json({ message: "Sub-category not found" });

    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sub-category", error });
  }
};
