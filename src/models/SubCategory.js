import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
  image: String,
  description: String,
  tax_applicable: { type: Boolean },
  tax: { type: Number },
});

export default mongoose.model("SubCategory", subCategorySchema);
