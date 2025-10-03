import { v7 as uuidv7 } from "uuid";
import connectToDatabase from "../../config/db.js";
import collection from "../../config/collection.js";

export const addProduct = async (req, res) => {
  console.log("Add Product logic route working 🚀");
  try {
    const data = req.body;
    console.log(data);

    console.log(req.files); // array of files
    const pictures = req.files.map(
      (file) => `/userAssets/pictures/${file.filename}`
    );
    console.log(pictures);

    const productData = {
      name: data.name,
      shortDesc: data.shortDesc,
      description: data.description,
      category: data.category,
      brand: data.brand,
      price: data.price,
      discountPrice: data.discountPrice,
      stock: data.stock,
      rating: "",
      picturePath: pictures,
      thumbnail: "",
      status: data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDelete: false,
    };

    console.log(productData);

    const db = await connectToDatabase(process.env.DATABASE);
    const result = await db
      .collection(collection.PRODUCTS_COLLECTION)
      .insertOne(productData);
    console.log(result);

    return res.redirect("/admin/products-list");
  } catch (error) {
    console.log(error);
  }
};

export const productViewPage = async (req, res) => {
  console.log("Product view page route working 🚀");
  try {
    res.render("user/productView", { title: "Product View - ChronoRoyale" });
  } catch (error) {
    console.log(error);
  }
};


/**
 * Fetch products from the database with optional filters, sorting, and limit
 * @param {Object} options - Options for fetching products
 * @param {string} [options.category] - Filter by category (e.g. "men", "women")
 * @param {string} [options.brand] - Filter by brand (e.g. "Rolex")
 * @param {string} [options.sort] - Sort type ("latest", "oldest", "random")
 * @param {number} [options.limit] - Max number of products to return
 * @returns {Promise<Array>} - Array of products
 */
export const getProductsData = async (options = {}) => {
  try {
    const db = await connectToDatabase(process.env.DATABASE);

    // Build filter dynamically
    const filter = { isDelete: false };
    if (options.category) filter.category = options.category;
    if (options.brand) filter.brand = options.brand;

    let products;

    // If sort = random → use aggregation to return random products
    if (options.sort === "random") {
      products = await db
        .collection(collection.PRODUCTS_COLLECTION)
        .aggregate([
          { $match: filter }, // Apply filters
          { $sample: { size: options.limit || 20 } }, // Random selection
        ])
        .toArray();
    } else {
      // Sort by creation date
      let sortOption = { createdAt: -1 }; // latest first by default
      if (options.sort === "oldest") sortOption = { createdAt: 1 };

      let query = db
        .collection(collection.PRODUCTS_COLLECTION)
        .find(filter)
        .sort(sortOption);

      if (options.limit) {
        query = query.limit(parseInt(options.limit));
      }

      products = await query.toArray();
    }

    return products; // always returns a Promise
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    throw error;
  }
};
