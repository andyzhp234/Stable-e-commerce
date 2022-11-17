import Product from "../models/productModel.js";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const randomImageName = (bytes = 16) => {
  return crypto.randomBytes(bytes).toString("hex");
};

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
  },
});

// @desc    Fetch All Recommended products
// @route   GET /api/products/recommend
// @access  Public
const getRecommendProducts = async (req, res) => {
  try {
    let products = await Product.find({ isRecommend: true });
    res.json(products);
  } catch {
    res.status(404).json({ message: "Products not found" });
  }
};

// @desc    Fetch All New Arrivals products
// @route   GET /api/products/newarrivals
// @access  Public
const getNewArrivalsProducts = async (req, res) => {
  try {
    let products = await Product.find({ isNewArrival: true });
    res.json(products);
  } catch {
    res.status(404).json({ message: "Products not found" });
  }
};

// @desc    Fetch All products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const pageSize = 6;
  const page = parseInt(req.query.pageNumber) || 1;

  let filterKeyword = [{}];
  if (req.query.inStockQuery === "true") {
    filterKeyword.push({
      countInStock: { $gt: 0 },
    });
  }
  if (req.query.minPriceQuery && req.query.minPriceQuery !== "null") {
    filterKeyword.push({
      price: { $gt: parseInt(req.query.minPriceQuery) * 100 },
    });
  }
  if (req.query.maxPriceQuery && req.query.maxPriceQuery !== "null") {
    filterKeyword.push({
      price: { $lt: parseInt(req.query.maxPriceQuery) * 100 },
    });
  }

  if (req.query.categoryQuery && req.query.categoryQuery !== "null") {
    let categoryArr = req.query.categoryQuery.split("_");
    let categoryQueryArr = [];
    for (let i = 0; i < categoryArr.length; i++) {
      if (categoryArr[i] !== "") {
        categoryQueryArr.push({
          category: {
            $regex: categoryArr[i],
            $options: "i",
          },
        });
      }
    }
    filterKeyword.push({ $or: categoryQueryArr });
  }

  if (req.query.brandQuery && req.query.brandQuery !== "null") {
    let brandArr = req.query.brandQuery.split("_");
    let brandQueryArr = [];
    for (let i = 0; i < brandArr.length; i++) {
      if (brandArr[i] !== "") {
        brandQueryArr.push({
          brand: {
            $regex: brandArr[i],
            $options: "i",
          },
        });
      }
    }
    filterKeyword.push({ $or: brandQueryArr });
  }

  let sortKeyword;
  if (
    req.query.sortBy &&
    req.query.sortBy !== "null" &&
    req.query.sortBy !== "bestmatch"
  ) {
    if (req.query.sortBy === "ascprice") {
      sortKeyword = { price: 1 };
    } else if (req.query.sortBy === "descprice") {
      sortKeyword = { price: -1 };
    } else if (req.query.sortBy === "rating") {
      sortKeyword = { rating: -1 };
    }
  } else {
    sortKeyword = {};
  }

  const keyword =
    req.query.search && req.query.search !== "null"
      ? [
          {
            name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ]
      : [{}];

  try {
    let count = await Product.countDocuments({
      $and: [{ $or: keyword }, { $and: filterKeyword }],
    });
    let products = await Product.find({
      $and: [{ $or: keyword }, { $and: filterKeyword }],
    })
      .sort(sortKeyword)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch {
    res.status(404).json({ message: "Products not found" });
  }
};

// @desc    Fetch a product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete a product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (products) {
      // first delete img in AWS
      for (let i = 0; i < products.images.length; i++) {
        let imageFileName = products.images[i].split(
          "https://d2c0vv5h4nuw6w.cloudfront.net/images/"
        )[1];
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `images/${imageFileName}`,
        };
        const command = new DeleteObjectCommand(params);
        try {
          await s3.send(command);
        } catch {
          console.log("img no longer exists");
        }
      }
      // Then delete img in Database
      await products.remove();
      res.json({ message: "Product Removed" });
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc    create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    let images = [];
    for (let i = 0; i < req.files.length; i++) {
      const imageName = randomImageName();
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${imageName}`,
        Body: req.files[i].buffer,
        ContentType: req.files[i].mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
      images.push("https://d2c0vv5h4nuw6w.cloudfront.net/images/" + imageName);
    }
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user._id,
      images: images,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      numReviews: 0,
      isRecommend: req.body.isRecommend,
      isNewArrival: req.body.newArrivals,
    });
    const createdProduct = await product.save();
    res.status(200).json(createdProduct);
  } catch (error) {
    res.status(404).json({ message: "Failed to Create Product" });
  }
};

// @desc    update a product by id
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    let {
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      isRecommend,
      newArrivals,
    } = req.body;

    const product = await Product.findById(req.params.id);
    let images = undefined;
    if (product) {
      // If new images file added
      if (req.files.length > 0) {
        images = [];

        // delete all old images
        for (let i = 0; i < product.images.length; i++) {
          let imageFileName = product.images[i].split(
            "https://d2c0vv5h4nuw6w.cloudfront.net/images/"
          )[1];
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${imageFileName}`,
          };
          const command = new DeleteObjectCommand(params);
          try {
            await s3.send(command);
          } catch {
            console.log("img no longer exists");
          }
        }

        // add all new images
        for (let i = 0; i < req.files.length; i++) {
          const imageName = randomImageName();
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `images/${imageName}`,
            Body: req.files[i].buffer,
            ContentType: req.files[i].mimetype,
          };
          const command = new PutObjectCommand(params);
          await s3.send(command);
          images.push(
            "https://d2c0vv5h4nuw6w.cloudfront.net/images/" + imageName
          );
        }
      }

      if (images) product.images = images;
      product.name = name || product.name;
      product.price = price || product.price;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.description = description || product.description;
      product.isRecommend = isRecommend;
      product.isNewArrival = newArrivals;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      throw new Error("Product not Found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a new review for a product
// @route   Post /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      // const alreadyReviewed = product.reviews.find(
      //   (r) => r.user.toString() === req.user._id.toString()
      // );
      // if (alreadyReviewed) {
      //   throw new Error("Product Already Reviewed");
      // }
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, item) => item.rating + a, 0) /
        product.numReviews;
      await product.save();
      res.status(201).json({ message: "review added" });
    } else {
      throw new Error("Product not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export {
  getRecommendProducts,
  getNewArrivalsProducts,
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
};
