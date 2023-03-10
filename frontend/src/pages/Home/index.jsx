import React from "react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import { getRecommendProducts } from "../../lib/axiosAPI";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Home() {
  const navigate = useNavigate();
  const [recommend, setRecommend] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init();
    getRecommendProducts()
      .then(function (res) {
        setRecommend(res.data);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__section1">
        <div
          className="home__section1__description"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <p>One Week Only</p>
          <p>Celebrate Modern Furniture Sale</p>
          <p>Up to 25% off</p>
          <div
            className="start-shopping-button"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/shop");
            }}
          >
            Start Shopping
          </div>
        </div>
        <LazyLoadImage
          wrapperClassName="home__section1__backgroundImg"
          alt={"backgroundImage"}
          effect="blur"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/images/898a1bab9421b4a0.jpg"
          placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/898a1bab9421b4a0.jpg"
        />
      </div>
      <div className="home__section2">
        <div className="home__section2__title">Recommend Products: </div>
        <div className="home__section2__listings">
          {recommend.map((item, index) => {
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
                  alt={"recommend_product"}
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
      <div className="home__section3">
        <LazyLoadImage
          wrapperClassName="home__section3__backgroundImg"
          alt={"backgroundImage"}
          effect="blur"
          src="https://d2c0vv5h4nuw6w.cloudfront.net/images/13c4db2a98023ffd.jpg"
          placeholderSrc="https://d2c0vv5h4nuw6w.cloudfront.net/images/13c4db2a98023ffd.jpg"
        />
        <div className="home__section3__about">
          <div
            className="home__section3__title"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            About Us
          </div>
          <div
            className="home__section3__description"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            At Stable, We are here to help everyone, anywhere, create their
            feeling of home.
          </div>
          <div
            className="home__section3__description"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Every day our team of designers works on designing the best
            furniture to bring you the best and latest in furniture, home
            accessories, and furnishings, including exclusive styles you won't
            find anywhere else.
          </div>
          <div
            className="home__section3__description"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Stable is a perfect go-to source for modern furniture and home decor
            accessories. Buying furniture online sight unseen can be scary. We
            know that but we're devoted to making the process easy and efficient
            so you can click “add to cart” with confidence.
          </div>
          <div
            className="home__section3__description"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            We are passionate about doing our part to make life better. We offer
            premium products at competitive prices with top-notch customer
            support. We connect people with products and services in new and
            unexpected ways. We do our part to help building everyone's ideal
            homes.
          </div>
        </div>
      </div>
    </div>
  );
}
