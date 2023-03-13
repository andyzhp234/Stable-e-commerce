import React from "react";
import { getRecommendProducts } from "../../lib/axiosAPI";
import HomeLanding from "./HomeLanding";
import HomeAbout from "./HomeAbout";
import HomeAboutMaterials from "./HomeAboutMaterials";
import HomeFeatured from "./HomeFeatured";

export default function Home() {
  const [recommend, setRecommend] = React.useState([]);

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
      <HomeLanding />
      <HomeAbout />
      <HomeAboutMaterials />
      <HomeFeatured recommend={recommend} />
    </div>
  );
}
