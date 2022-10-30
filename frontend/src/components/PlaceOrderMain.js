import React from 'react'
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function PlaceOrderMain() {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  
  return (
    <div className='place_order_page_main_info'>
      
      <div className='order_page_main_info_section'>
        <div className='order_page_main_info_title'>
          Shipping Address
        </div>
        <div>
          Address: {' '}
          {cart.shippingAddress.address}, {' '}
          {cart.shippingAddress.city}, {' '}
          {cart.shippingAddress.postalCode}, {' '}
          {cart.shippingAddress.country}
        </div>
      </div>

      <div className='order_page_main_info_section'>
        <div className='order_page_main_info_title'>
          Payment Method
        </div>
        <div>
          Method: {cart.paymentMethod === 'credit'?
            "Credit Card":"Not Selected"
          }
        </div>
      </div>

      <div className='order_page_main_info_section'>
        <div className='order_page_main_info_title'>
          Order Items
        </div>
        <div>
          {cart.cartItems.map((item) => {
            return(
              <div key={item.productID} className="reivew_carts" onClick={() => navigate(`/product/${item.productID}`)}>
                <img className="review_img" src={item.image} alt="review_img"/>
                <div>{item.name}</div>
                <div>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
