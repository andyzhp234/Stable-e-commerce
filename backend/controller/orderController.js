import Order from '../models/orderModel.js'


// @desc    Create new Order
// @route   POST /api/orders
// @access  Private 
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      subTotalPrice,
    } = req.body;
  
    if (orderItems && orderItems.length === 0) {
      throw new Error('No order Items')
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        subTotalPrice,
      })

      const createdOrder = await order.save();
      res.status(201).json(createdOrder)
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

// @desc    Get Order By Id
// @route   GET /api/orders/:id
// @access  Private 
const getOrderItems = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order)
    } else {
      throw new Error('Order Not Found')
    }
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

// @desc    Update Order Payment Status
// @route   PUT /api/orders/:id/pay
// @access  Private 
const updateOrderItemPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      throw new Error('Update Payment Failed')
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

export {
  addOrderItems,
  getOrderItems,
  updateOrderItemPayment,
}