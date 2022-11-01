import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {addToCart, deleteFromCart} from '../redux/action/apiCart.js';
import {startStripeCheckOut} from '../redux/action/apiOrder.js';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const user = useSelector((state) => state.user)
  const { userInfo } = user

  function quantityHandler(productInfo, count) {
    if (count > 0) {
      let product = {
        ...productInfo,
        _id: productInfo.productID
      }
      dispatch(addToCart(product, count))
    }
  }

  function deleteHandler(id) {
    dispatch(deleteFromCart(id))
  }

  function checkoutHandler(e) {
    e.preventDefault();
    if (userInfo && cartItems.length > 0) {
      dispatch(startStripeCheckOut({orderItems: cart.cartItems}))
    } else {
      navigate('/login?redirect=cart')
    }
  }

  return (
    <div className='cartPage'>
      <div className='cart_title'>
        Shopping Cart
      </div>
      
      <div className='carts'>
        {
          cartItems.length === 0?
          <div>
            Your shopping cart is currently empty.
          </div>:
          <div>
            {cartItems.map((product) => {
              return (
                <div 
                  className='product_listing'
                  key={product.productID}
                >
                  <img 
                    src={product.image[0]}
                    alt="product_image"
                    onClick={() => navigate(`/product/${product.productID}`)}
                  />
                  <div 
                    className='product_listing_name'
                    onClick={() => navigate(`/product/${product.productID}`)}
                  >
                    {product.name}
                  </div>
                  <div className='product_listing_quantity'>
                    <img
                      src="/images/minus-icon.png"
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty - 1)}
                    />
                    {product.qty}
                    <img
                      src="/images/plus-icon.png"
                      alt=""
                      onClick={(e) => quantityHandler(product, product.qty + 1)}
                    />
                  </div>
                  <div className='product_listing_subtotal'>
                    <div>
                      $ {(product.price*product.qty).toFixed(2)}
                    </div>
                    <div 
                      style={{color: 'red', cursor:'pointer'}}
                      onClick={() => deleteHandler(product.productID)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        }
      </div>

      <div className='cart_checkout'>
        <div className='cart_subtotal'>
          Subtotal: $ 
            {cartItems.length === 0? 0:
              cartItems.reduce((init,a) => {
                return init + (a.price*a.qty)
              },0).toFixed(2)
            }
        </div>
        <div className='cart_items'>
          Total Items: {cartItems.length}
        </div>
        <div
          id='cart_checkout_button'
          onClick={checkoutHandler}
        >
          Checkout
        </div>
      </div>
    </div>
  )
}
