import React from "react";
// import LandingImage1 from "../../assets/bg-landing-1.jpg";

export default function HomeAbout() {
  return (
    <div className="home__about">
      <h1 className="home__about__title">ABOUT US</h1>
      <p data-aos="fade-up" data-aos-duration="1000">
        Our mission is to bring you high-quality furniture that not only looks
        great but also feels great. We believe that furniture shopping should be
        a delightful experience, which is why we make it easy for you to find
        the perfect piece for your space.
      </p>
      <img
        className="home__about__bottomImg"
        src="https://d2c0vv5h4nuw6w.cloudfront.net/images/bg-landing.jpg"
        alt="landing background images"
        data-aos="fade-up"
        data-aos-duration="1000"
      />
      <img
        className="home__about__rightImg"
        src="https://d2c0vv5h4nuw6w.cloudfront.net/images/bg-landing-1.jpg"
        alt="landing background images"
        data-aos="fade-up"
        data-aos-duration="1000"
      />
    </div>
  );
}
