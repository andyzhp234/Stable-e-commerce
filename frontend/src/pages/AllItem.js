import React from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import Filter from '../components/Filter';
import LeftPanel from '../components/LeftPanel';
import Listing from '../components/Listing';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function AllItem() {
  React.useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='allItems'>
      <div className='allItems_img' data-aos="zoom-out" data-aos-duration="1500">
        <div style={{zIndex:3}}>
          All Products
        </div>
        {/* <img 
          src="./images/pexels-photo-3097112.jpeg"
          alt="landing_img"
          width={'100%'}
          height={'100%'}
        /> */}
        <LazyLoadImage
          alt={"landing_img"}
          src={"./images/pexels-photo-3097112.jpeg"}
          height={'100%'}
          width={'100%'}
          effect="blur"
          style={{zIndex:0}}
        />
      </div>

      <div className='all_items_listing_sections'>
        <Filter />
        <div className='all_items_container'>
          <LeftPanel />
          <Listing />
        </div>
      </div>
    </div>
  )
}
