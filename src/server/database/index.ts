import mongoose from "mongoose";
import "dotenv/config";

const Database = async () =>
  await mongoose
    .connect(
      `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.vtzljwz.mongodb.net/test`
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));

mongoose.Promise = global.Promise;

export { mongoose, Database };
