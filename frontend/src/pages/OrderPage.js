import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getOrderDetail } from '../redux/action/apiOrder';
import { useParams } from 'react-router-dom';


export default function OrderPage() {
  const dispatch = useDispatch();
  const params = useParams()
  const orderDetail = useSelector(state => state.order);
  const {order, pending, error, errorMessage} = orderDetail;
  
  console.log(order)
  React.useEffect(() => {
    dispatch(getOrderDetail(params.id))
  }, [dispatch, params.id])

  return (
    <div className='place_order_page'>
      {pending? <div>Loading...</div>:
        error? <div style={{color:'red'}}>{errorMessage}</div>:
        <>
          <div className='place_order_page_main_info'>
            <div className='orderDetail_title'>
              Order {order?._id}
            </div>
            <div className='order_page_main_info_section'>
              <div className='order_page_main_info_title'>
                Shipping Address
              </div>
              <div>
                Address: {' '}
                {order?.shippingAddress.address}, {' '}
                {order?.shippingAddress.city}, {' '}
                {order?.shippingAddress.postalCode}, {' '}
                {order?.shippingAddress.country}
              </div>
              {order?.isDelivered?<div>{order?.deliveredAt}</div>:<div style={{color:'red'}}>Not Delivered</div>}
            </div>

            <div className='order_page_main_info_section'>
              <div className='order_page_main_info_title'>
                Payment Method
              </div>
              <div>
                Method: {order?.paymentMethod === 'credit'?
                  "Credit Card":"Not Selected"
                }
              </div>
              {order?.isPaid?<div>{order?.paidAt}</div>:<div style={{color:'red'}}>Not Paid</div>}
            </div>

            <div className='order_page_main_info_section'>
              <div className='order_page_main_info_title'>
                Order Items
              </div>
              <div>
                {order?.orderItems.map((item) => {
                  return(
                    <div key={item.productID} className="reivew_carts">
                      <img className="review_img" src={item.image} alt="review_img"/>
                      <div>{item.name}</div>
                      <div>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>


          <div className='place_order_page_order_summary'>
            <div className='order_summary_title'>
              Order Summary
            </div>

            <div className='place_order_page_subtotal'>
              <div>
                Subtotal
              </div>
              <div>
                $ {order?.subTotalPrice}
              </div>
            </div>

            <div className='place_order_page_subtotal'>
              <div>
                Tax
              </div>
              <div>
                $ {order?.taxPrice}
              </div>
            </div>

            <div className='place_order_page_subtotal'>
              <div>
                Shipping
              </div>
              <div>
                $ {order?.shippingPrice}
              </div>
            </div>

            <div className='place_order_page_subtotal total'>
              <div>
                Total
              </div>
              <div>
                $ {order?.totalPrice}
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}
