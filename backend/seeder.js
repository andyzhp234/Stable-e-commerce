import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("data inserted");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}

// import fs from "fs";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
// } from "@aws-sdk/client-s3";

// dotenv.config({ path: "../.env" });

// const randomImageName = (bytes = 16) => {
//   return crypto.randomBytes(bytes).toString("hex");
// };

// const s3 = new S3Client({
//   region: process.env.AWS_BUCKET_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
//   },
// });

// let data = fs.readFileSync(
//   "./data/product-Images/pexels-nadin-sh-14286678.jpg"
// );

// const imageName = randomImageName();
// const params = {
//   Bucket: process.env.AWS_BUCKET_NAME,
//   Key: `images/${imageName}`,
//   Body: data,
//   ContentType: "image/jpeg",
// };
// const command = new PutObjectCommand(params);
// await s3.send(command);
