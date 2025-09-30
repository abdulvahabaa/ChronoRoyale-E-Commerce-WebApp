
import { v7 as uuidv7 } from "uuid";
import connectToDatabase from "../../config/db.js";
import collection from "../../config/collection.js";

export const addProduct = async (req, res) => {
    console.log("Add Product logic route working 🚀");
  try {
    const data = req.body;
    console.log(data)

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
      picturePath: "",
      thumbnail: "",
      status: data.status,
      createdAt: new Date(),
      updatedAt:  new Date(),
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
