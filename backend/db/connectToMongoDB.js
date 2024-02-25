import mongoose from "mongoose";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log("error connecting to mongo DB", err.message);
  }
};
export default connectToMongoDB;
