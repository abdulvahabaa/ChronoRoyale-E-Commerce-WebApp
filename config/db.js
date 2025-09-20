import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_DB_URI;
let client;

const connectToDatabase = async (databaseName) => {
  if (client) {
    console.log("\nProcess ID:", process.pid, "- Using Cached Connection\n");
    return client.db(databaseName);
  }

  try {
    console.log(
      "\nProcess ID:",
      process.pid,
      "- Establishing New Connection -",
      new Date().toISOString(),
      "\n"
    );

    client = await MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 6,
    });

    console.log("Connection to MongoDB established successfully");

    return client.db(databaseName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;