const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
    },
    brand: {
      type: String,
    },
    unitPrice: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belongs to a category"],
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate("category", "title");
  next();
});

module.exports = mongoose.model("Product", productSchema);
