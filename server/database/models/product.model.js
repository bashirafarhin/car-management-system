import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {  title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
      },
      images: {
        type: [String], // Array of image URLs
        validate: {
          validator: function (value) {
            return value.length <= 10; // Ensure max 10 images
          },
          message: "You can upload up to 10 images only",
        },
        default: [],
      },
      tags: {
        type: [String], // Additional tags for filtering/search
      },
      carType: {
        type: String,
        required: [true, "Car type is required"],
        trim: true,
        enum: ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"], // Example categories
      },
      company: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
      },
      dealer: {
        type: String,
        required: [true, "Dealer name is required"],
        trim: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
  }
);

const productFields = ['title', 'description', 'tags', 'carType', 'company', 'dealer'];
productSchema.statics.searchProducts = async function (input, userId) {
  const searchConditions = productFields.map((field) => ({
    [field]: { $regex: input, $options: 'i' }, // Case-insensitive search
  }));
  try {
    const products = await this.find({
      userId, // Ensure the userId matches
      $or: searchConditions, // Search across all the specified fields
    });
    return products;
  } catch (err) {
    throw new Error('Error fetching products: ' + err.message);
  }
};

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
