import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "node:path";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import enforce from "express-sslify";

// Configured .env file and Connect to MongoDB Altas
dotenv.config();
connectDB();

const server = express();
server.use(enforce.HTTPS({ trustProtoHeader: true }));

server.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

server.use("/stripe", stripeRoutes);

// only needed when submitting with application/ x-www-form-urlencoded
// server.use(express.urlencoded({extended: false}));

// parse request body to JSON format
server.use(express.json());

server.use("/api/products", productRoutes);
server.use("/api/users", userRoutes);
server.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
if (process.env.MODE === "production") {
  server.use(express.static(path.join(__dirname, "/frontend/build")));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
