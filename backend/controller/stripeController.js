import Stripe from "stripe";
import Order from "../models/orderModel.js";

// @desc    Stripe order checkout
// @route   POST /stripe/create-checkout-session
// @access  Private
const stripeCheckOut = async (req, res) => {
  try {
    const { orderItems, customerID } = req.body;

    let metaDatas = {};
    let itemsList = [];
    orderItems.map((item, index) => {
      itemsList.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: parseFloat(item.price),
        },
        quantity: item.qty,
        tax_rates: ["txr_1M5U3JASzu4JHJRJUZ2jqb2M"],
      });
      metaDatas[`orderItems_${index}`] = JSON.stringify(item);
    });

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      line_items: itemsList,
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: customerID,
      success_url: `${process.env.DOMAIN}/successPayment`,
      cancel_url: `${process.env.DOMAIN}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1M5U3aASzu4JHJRJbIkd0YTd" },
        { shipping_rate: "shr_1M5U3xASzu4JHJRJkNjh3dS4" },
        { shipping_rate: "shr_1M5U4HASzu4JHJRJeKKgwQ22" },
      ],
      metadata: metaDatas,
    });

    res.status(201).json({ url: session.url });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

// helper function to save order to MongoDB
const saveOrder = async (paymentIntent) => {
  try {
    const {
      client_reference_id,
      shipping_details,
      id,
      amount_subtotal,
      amount_total,
      total_details,
      payment_status,
      metadata,
    } = paymentIntent;

    let orderItemsArray = [];
    for (let i in metadata) {
      orderItemsArray.push(JSON.parse(metadata[i]));
    }
    const order = new Order({
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
      isPaid: payment_status === "paid" ? true : false,
      paidAt: payment_status === "paid" ? new Date() : null,
      isDelivered: false,
      orderPaymentID: id,
      displayImage: paymentIntent.metadata.displayImage,
    });
    await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// @desc    Stripe Webhook
// @route   POST /stripe/webhook
// @access  Public
const stripeWebHook = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const paymentIntent = event.data.object;
    try {
      await saveOrder(paymentIntent);
    } catch (error) {
      response.status(400).send(`Error Saving Order: ${error.message}`);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

export { stripeCheckOut, stripeWebHook };
