import React from "react";
import { getNewArrivals } from "../../lib/axiosAPI";
import Meta from "../../components/Meta";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductsPrimary from "../../components/ProductsPrimary";

export default function NewArrivals() {
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
          <h1>New Arrivals</h1>
          <LazyLoadImage
            wrapperClassName="newArrival__landingImg"
            alt="newarrival_background"
            effect="blur"
            src="https://d2c0vv5h4nuw6w.cloudfront.net/images/6848967646007edc.jpg"
            placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/6848967646007edc.jpg"
          />
        </div>
        <div className="newarrivals__listings">
          {newArrivals.map((item) => {
            return <ProductsPrimary key={item._id} product={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
