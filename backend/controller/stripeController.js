import Stripe from 'stripe';
const stripe = new Stripe('');



// @desc    Stripe order checkout
// @route   POST /api/create-checkout-session
// @access  Private
const stripeCheckOut = async (req, res) => {
  console.log(process.env.STRIPE_PRIVATE_KEY)
}



export {
  stripeCheckOut,
}