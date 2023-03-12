import React from "react";
import LandingImage1 from "../../assets/bg-landing-1.jpg";
import { useNavigate } from "react-router-dom";
import { getRecommendProducts } from "../../lib/axiosAPI";
import ProductsPrimary from "../../components/ProductsPrimary";

export default function Home() {
  const navigate = useNavigate();
  const [recommend, setRecommend] = React.useState([]);
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);

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
      <div className="home__landing">
        <div className="home__landing__content">
          <h1 className="home__landing__title">
            Bring your dream space to life with our furniture collection
          </h1>
          <div
            className="fit-button margin-block-start-32"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </div>
        </div>
        <img
          className="home__landing__image"
          src="https://images.pexels.com/photos/3933240/pexels-photo-3933240.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="landing background images"
        />
      </div>
      <div className="home__about">
        <h1 className="fs-700">ABOUT US</h1>
        <p>
          Our mission is to bring you high-quality furniture that not only looks
          great but also feels great. We believe that furniture shopping should
          be a delightful experience, which is why we make it easy for you to
          find the perfect piece for your space.
        </p>
        <img
          className="home__about__bottomImg"
          src="https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="landing background images"
        />
        <img
          className="home__about__rightImg"
          src={LandingImage1}
          alt="landing background images"
        />
      </div>
      <div className="home__materials" ref={targetRef}>
        We believe that good design should also be good for the planet. That's
        why we're proud to say that all of our furniture is made from 100%
        recycled materials, and we're committed to reducing our environmental
        footprint every step of the way.
      </div>
      <div className="home__featured">
        <h1 className="fs-700">FEATURED PRODUCTS</h1>
        <div className="home__featured__container">
          {recommend.map((item) => (
            <ProductsPrimary key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
