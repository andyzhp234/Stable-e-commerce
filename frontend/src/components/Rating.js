import React from 'react'

export default function Rating(prop) {
  let rating = prop.product.rating
  let starStyle = {
    width: '14px',
    height: '14px',
    marginRight: '4px',
  }
  return (
    <div>
     <img 
        src = {rating > 0?
          rating > 0.5?
            "/images/star-fill.png"
            :
            "/images/star-half-fill.png"
          :
          "/images/star-unfill.png"
        }
        alt="ratings"
        style={starStyle}
      />
      <img 
        src = {rating > 1?
          rating > 1.5?
            "/images/star-fill.png"
            :
            "/images/star-half-fill.png"
          :
          "/images/star-unfill.png"
        }
        alt="ratings"
        style={starStyle}
      />
      <img 
        src = {rating > 2?
          rating > 2.5?
            "/images/star-fill.png"
            :
            "/images/star-half-fill.png"
          :
          "/images/star-unfill.png"
        }
        alt="ratings"
        style={starStyle}
      /> 
      <img 
        src = {rating > 3?
          rating > 3.5?
            "/images/star-fill.png"
            :
            "/images/star-half-fill.png"
          :
          "/images/star-unfill.png"
        }
        alt="ratings"
        style={starStyle}
      /> 
      <img 
        src = {rating > 4?
          rating > 4.5?
            "/images/star-fill.png"
            :
            "/images/star-half-fill.png"
          :
          "/images/star-unfill.png"
        }
        alt="ratings"
        style={{...starStyle, marginRight:'15px'}}
      /> 
      {prop.product.numReviews} Reviews
    </div>
  )
}
