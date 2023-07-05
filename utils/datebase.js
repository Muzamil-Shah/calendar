import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db connect to ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
