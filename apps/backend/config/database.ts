import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = () => {
  const connectionURL = process.env.MONGODB_URL;

  if (!connectionURL) {
    throw new Error("DB URL is missing");
  }
  mongoose
    .connect(connectionURL)
    .then(() => console.log("DB CONNECTION SUCCESSFULL"))
    .catch((error) => {
      console.log("DB CONNECTION FAILED!!");
      console.log(error);
      process.exit(1);
    });
};
