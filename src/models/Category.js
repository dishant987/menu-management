import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String,
  description: String,
  tax_applicable: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  tax_type: { type: String },
});

export default mongoose.model("Category", categorySchema);
