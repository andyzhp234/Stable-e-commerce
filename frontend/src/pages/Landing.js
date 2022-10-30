import React from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import News from '../components/News';
import Recommend from '../components/Recommend';
import About from '../components/About';


export default function Landing() {
  React.useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="landing" data-aos="zoom-out" data-aos-duration="1500">
      <div className='landing_title'>
        <div>
          BEST Furniture
        </div>
        <div>
          E - Commerce Website
        </div>
      </div>
      <img src="./images/pexels-photo-2079246.jpeg" alt="allItem_title_Img" />
      <News />
      <Recommend />
      <About />
    </div>
  )
}
