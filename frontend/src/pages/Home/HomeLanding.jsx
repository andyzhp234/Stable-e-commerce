import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeLanding() {
  const navigate = useNavigate();

  return (
    <div className="home__landing">
      <div
        className="home__landing__content"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h1 className="home__landing__title">
          Bring your dream space to life with our furniture collection
        </h1>
        <div className="home-landing-button" onClick={() => navigate("/shop")}>
          Shop Now
        </div>
      </div>

      <img
        className="home__landing__image"
        src="https://images.pexels.com/photos/3933240/pexels-photo-3933240.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="landing background images"
      />
    </div>
  );
}
