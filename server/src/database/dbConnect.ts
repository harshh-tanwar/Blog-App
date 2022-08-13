import mongoose from "mongoose";
import config from "../config/config";

const dbConnect = async () => {
  try {
    await mongoose.connect(config.db_url);
    console.log("🟢 Conected to Database");
  } catch (error) {
    console.log("Error Connnecting to Database", error);
  }
};

export default dbConnect;
