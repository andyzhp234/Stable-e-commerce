import Product from '../models/productModel.js';

// @desc    Fetch All products
// @route   GET /api/products
// @access  Public 
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch {
    res.status(404).json({message: 'Products not found'})
  }
}


// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public 
const getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id)
    res.json(products)
  } catch (error) {
    res.status(404).json({message: 'Product not found'})
  }
}


export {
  getProducts,
  getProductById,
}