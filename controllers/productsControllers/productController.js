import connectToDatabase from "../../config/db.js";
import collection from "../../config/collection";

export const addProduct  = async (req,res)=>{
    try {
        const data = req.body
        console.log(data);

        const db = await connectToDatabase(process.env.DATABASE);
        const result = await db.collection(collection.PRODUCTS_COLLECTION).insertOne(data);
        console.log(result);
        
    } catch (error) {
        
    }
}