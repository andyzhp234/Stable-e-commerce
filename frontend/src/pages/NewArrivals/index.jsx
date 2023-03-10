import React from "react";
import { getNewArrivals } from "../../lib/axiosAPI";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NewArrivals() {
  const navigate = useNavigate();
  const [newArrivals, setNewArrivals] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getNewArrivals()
      .then(function (res) {
        setNewArrivals(res.data);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="newarrivals">
      <Meta title="New Arrivals" />
      <div className="newarrivals__container">
        <div className="newarrivals__title">
          <div>New Arrivals</div>
          <LazyLoadImage
            wrapperClassName="productCard_primary__image"
            alt="newarrival_background"
            effect="blur"
            src="https://d2c0vv5h4nuw6w.cloudfront.net/images/6848967646007edc.jpg"
            placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/6848967646007edc.jpg"
          />
        </div>
        <div className="newarrivals__listings">
          {newArrivals.map((item, index) => {
            return (
              <div
                className="productCard_home"
                data-aos="fade-up"
                data-aos-duration={500 + (index % 3) * 400}
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <LazyLoadImage
                  wrapperClassName="productCard_home__productImg"
                  alt="newarrival_background"
                  effect="blur"
                  src={item.images[0]}
                  placeholderSrc={item.images[0]}
                />
                <div className="productCard_home__title">{item.name}</div>
                <div className="productCard_home__price">
                  $ {item.price / 100}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
