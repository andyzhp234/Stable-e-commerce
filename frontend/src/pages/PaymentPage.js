import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/action/apiCart';
export default function PaymentPage() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const {shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = React.useState('credit')

  const dispatch = useDispatch()
  function submitPaymentHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className='shipping_body'>
      <CheckoutSteps currentStep={1}/>
      <form className='shipping_container' onSubmit={submitPaymentHandler}>
        <div className='shipping_title'>Payment Methods</div>
        <div className='shipping_payment_method_title'>Select Method</div>
        <div id='shipping_payment_methods'>
          <input
            type="radio"
            id="credit"
            name="credit"
            value="credit"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={true}
          />
          <label htmlFor='credit'>Credit Card</label>
        </div>
        <button>Continue</button>
      </form>
    </div>
  )
}
