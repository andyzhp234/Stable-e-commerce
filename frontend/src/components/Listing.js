import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import getProductList from '../redux/action/apiProductList.js'
import Products from './Products'

export default function Listing() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {pending, error, errorMessage, productListInfo} = productList;

  React.useEffect(() => {
    getProductList(dispatch)
  }, [dispatch])

  return (
    <div className='listing'>
      {pending?
        <div>
          Loading
        </div>
        :
        error?
          <div>
            {errorMessage}
          </div>
          :
          <div className='listing_grid'>
            {productListInfo.map((product) => {
              return (
                <Products key={product._id} product={product}/>
              )
            })}
          </div>
      }
    </div>
  )
}
