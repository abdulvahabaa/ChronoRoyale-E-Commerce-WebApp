import connectToDatabase from "../../config/db.js";
import collection from "../../config/collection";

export const addProduct = async (req, res) => {
    console.log("Add Product route working 🚀");
  try {
    const data = req.body;

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
      picturePath: data.images,
      thumbnail: data.thumbnail,
      status: data.status,
      createdAt: Date().now(),
      updatedAt: Date().now(),
      isDelete: false,
    };

    console.log(productData);

    // const db = await connectToDatabase(process.env.DATABASE);
    // const result = await db
    //   .collection(collection.PRODUCTS_COLLECTION)
    //   .insertOne();
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
};
