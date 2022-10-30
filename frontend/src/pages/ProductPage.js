import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import getProductDetail from '../redux/action/apiProductDetail'
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import {addToCart} from '../redux/action/apiCart.js'
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
  const navigate = useNavigate();
  const params = useParams()
  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const {pending, error, errorMessage, productInfo} = productDetail;
  
  const [currImg, setCurrImg] = React.useState(0)
  const [count, setCount] = React.useState(1)

  React.useEffect(() => {
    getProductDetail(params.id, dispatch)
  }, [dispatch, params.id])


  function addToCartHandler(e) {
    e.preventDefault();
    dispatch(addToCart(productInfo, count))
    navigate('/cart')
  }

  return (
    <div>
      {pending?
        <div style={{height: '90vh'}}>
          Loading
        </div>
        :
        error?
          <div style={{height: '90vh'}}>
            {errorMessage}
          </div>
          :
          <div className='productPage'>
            <img
              className='product_main_img'
              src={productInfo.image?.[currImg]}
              alt="product_images"
            />
            <div className='product_img_paginations'>
              {productInfo.image?.map((img, index) => {
                return (
                  <img 
                    src={img}
                    alt={index}
                    key={index}
                    onClick={(e) => setCurrImg(parseInt(e.target.alt))}
                  />
                )
              })}
            </div>
            
            <div className='product_detail_descriptions'>
              <div className='product_detail_title'>
                {productInfo.name}
              </div>
              <div className='product_detail_rating'>
                <Rating product={productInfo}/>
              </div>
              <div className='product_detail_price'>
                $ {productInfo.price}
              </div>

              {
                productInfo.countInStock > 0?
                <div className='product_detail_count'>
                  <div className='product_detail_count_button'>
                    <img 
                      src="/images/minus-icon.png" 
                      alt="minus-button"
                      onClick={() => setCount((prevState) => {
                        if (prevState === 1) return prevState
                        else return prevState-1
                      })}
                    />
                    <div>
                      {count}
                    </div>
                    <img
                      src="/images/plus-icon.png"
                      alt="plus-button"
                      onClick={() => setCount(prevState => prevState+1)}
                    />
                  </div>
                </div>
                :
                null
              }

              <div className='product_detail_add_cart'>
                {
                  productInfo.countInStock > 0?
                    <div 
                      className='product_detail_add_cart_button'
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </div>:
                    <div className='product_detail_add_cart_button'>
                        Out of Stock
                    </div>
                }
              </div>

              <div className='product_detail_description'>
                <div style={{fontWeight: '700', fontSize: '25px'}}>
                  Descrption:
                </div>
                <div>
                  {productInfo.description}
                </div>
              </div>

              <div className='product_detail_reviews'>
                Write a Customer Review
              </div>

              <div className='product_detail_reviews'>
                Reviews
              </div>


            </div>
          </div>
      }
    </div>
  )
}
