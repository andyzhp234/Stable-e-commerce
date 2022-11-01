import Stripe from 'stripe';
import Order from '../models/orderModel.js'

// @desc    Stripe order checkout
// @route   POST /stripe/create-checkout-session
// @access  Private
const stripeCheckOut = async (req, res) => {
  try {
    const {
      orderItems,
      customerID,
    } = req.body;

    let itemsList = [];
    orderItems.map((item) => {
      itemsList.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [
              'https://images.pexels.com/photos/13990685/pexels-photo-13990685.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
            ],
            metadata: {
              'productID': item.productID
            },
          },
          unit_amount: parseFloat(item.price)*100,
        },
        quantity: item.qty,
        tax_rates: ['txr_1LzO1NASzu4JHJRJY8sOaDGv'],
      })
    })

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: itemsList,
      mode: 'payment',
      payment_method_types: ["card"],
      client_reference_id: customerID,
      success_url: `${process.env.DOMAIN}?success=true`,
      cancel_url: `${process.env.DOMAIN}?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate: 'shr_1LzO1kASzu4JHJRJA8ae1JPB'
        },
        {
          shipping_rate: 'shr_1LzO4gASzu4JHJRJ4Nwqvcb7'
        },
        {
          shipping_rate: 'shr_1LzO5XASzu4JHJRJcr62c8Fu'
        },
      ]
    })

    res.status(201).json({url : session.url})
  } catch(error) {
    res.status(error.statusCode).json({message : error.message})
  }
}


// helper function to save order to MongoDB
const saveOrder = async (paymentIntent) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const {
      client_reference_id,
      shipping_details,
      id,
      amount_subtotal,
      amount_total,
      total_details,
      payment_status,
    } = paymentIntent;
    
    const items = await stripe.checkout.sessions.listLineItems(paymentIntent.id)

    let orderItemsArray = [];
    items.data.map((item) => {
      orderItemsArray.push({
        name: item.description,
        qty: item.quantity,
        price: item.amount_subtotal,
      })
    })
    const order = new Order ({
      user: client_reference_id,
      orderItems: orderItemsArray,
      shippingAddress: {
        line1: shipping_details.address.line1,
        line2: shipping_details.address.line2,
        city: shipping_details.address.city,
        postalCode: shipping_details.address.postal_code,
        country: shipping_details.address.country,
      },
      paymentMethod: "Credit Card",
      taxPrice: total_details.amount_tax,
      shippingPrice: total_details.amount_shipping,
      subTotalPrice: amount_subtotal,
      totalPrice: amount_total,
      isPaid: payment_status === 'paid'? true:false,
      paidAt: payment_status === 'paid'? new Date():null,
      isDelivered: false,
      orderPaymentID: id,
    })
    await order.save();
  } catch(error) {
    throw new Error(error.message)
  }
}


// @desc    Stripe Webhook
// @route   POST /stripe/webhook
// @access  Public
const stripeWebHook = async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const paymentIntent = event.data.object;
    try {
      await saveOrder(paymentIntent)
    } catch(error) {
      response.status(400).send(`Error Saving Order: ${error.message}`);
    }
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

export {
  stripeCheckOut,
  stripeWebHook,
}