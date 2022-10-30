import React from 'react'
import Rating from './Rating';
import { useNavigate } from 'react-router-dom';


export default function Products(props) {
  const navigate = useNavigate();
  let product = props.product;
  return (
    <div
      className='individual_listing'
      onClick={()=> navigate(`/product/${product._id}`)}
    >
      <img loading="lazy" src={product.image[0]} alt="product_images"/>
      <div>
        {product.name}
      </div>
      <div>
        <Rating product={product} />
      </div>
      <div style={{fontSize:'22px'}}>
        $ {product.price}
      </div>
    </div>
  )
}
