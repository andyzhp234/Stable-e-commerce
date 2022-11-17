import Order from "../models/orderModel.js";

// @desc    Get All Orders
// @route   GET /api/orders/myorders
// @access  Private
const getAllMyOrders = async (req, res) => {
  const pageSize = 6;
  const page = parseInt(req.query.pageNumber) || 1;
  try {
    const count = await Order.countDocuments({ user: req.user._id });
    const orders = await Order.find({
      user: req.user._id,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get Order By Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderItems = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ message: "Order Not Found" });
  }
};

// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  const pageSize = 6;
  const page = parseInt(req.query.pageNumber) || 1;
  try {
    const count = await Order.countDocuments({});
    const orders = await Order.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Update an Order to Delivered
// @route   Put /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = req.body.isDelivered;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete an Order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.json({ message: "Order Removed" });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export {
  getOrderItems,
  getAllMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  deleteOrderById,
};
