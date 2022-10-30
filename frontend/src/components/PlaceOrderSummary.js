import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createOrder} from '../redux/action/apiOrder.js';

export default function PlaceOrderSummary() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const itemPrice = cart.cartItems.reduce((a, b) => a + b.price*b.qty, 0)
  const shippingPrice = itemPrice > 50? 0:12.99
  const taxPrice = Number(0.15*itemPrice).toFixed(2)
  const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const orderCreate = useSelector(state => state.order);
  const {order, createSuccess, error, errorMessage} = orderCreate;

  React.useEffect(() => {
    if (createSuccess) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, createSuccess])

  function placeOrderHandler(e) {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemPrice: itemPrice,
      subTotalPrice: itemPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    }))
  }


  return (
    <div className='place_order_page_order_summary'>
      <div className='order_summary_title'>
        Order Summary
      </div>

      <div className='place_order_page_subtotal'>
        <div>
          Subtotal
        </div>
        <div>
          $ {itemPrice}
        </div>
      </div>

      <div className='place_order_page_subtotal'>
        <div>
          Tax
        </div>
        <div>
          $ {taxPrice}
        </div>
      </div>

      <div className='place_order_page_subtotal'>
        <div>
          Shipping
        </div>
        <div>
          $ {shippingPrice}
        </div>
      </div>

      <div className='place_order_page_subtotal total'>
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>

      <div>
        {error && <div style={{color: 'red'}}>{errorMessage}</div>}
      </div>
      <button 
        className='placeOrderButton'
        onClick={placeOrderHandler}
      >
        Place Order
      </button>
    </div>
  )
}
