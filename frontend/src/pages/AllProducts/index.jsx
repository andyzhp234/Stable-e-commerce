import React from "react";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Listing from "./components/Listing";
import { useSearchParams } from "react-router-dom";
import Meta from "../../components/Meta";
import Paginate from "../../components/Paginate/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../redux/action/apiProductList.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundImg from "../../assets/images/b670bb1fd0ff3f29.jpg";

export default function AllProducts() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const currPageQuery = searchParams.get("currPage");
  const sortQuery = searchParams.get("sortBy");
  const inStockQuery = searchParams.get("inStock");
  const categoryQuery = searchParams.get("category");
  const brandQuery = searchParams.get("brand");
  const minPriceQuery = searchParams.get("minPrice");
  const maxPriceQuery = searchParams.get("maxPrice");
  const { productListInfo } = productList;

  React.useEffect(() => {
    getProductList(
      dispatch,
      searchQuery,
      currPageQuery,
      sortQuery,
      inStockQuery,
      categoryQuery,
      brandQuery,
      minPriceQuery,
      maxPriceQuery
    );
  }, [
    dispatch,
    searchQuery,
    currPageQuery,
    sortQuery,
    inStockQuery,
    categoryQuery,
    brandQuery,
    minPriceQuery,
    maxPriceQuery,
  ]);

  return (
    <div className="allproducts">
      {searchQuery ? (
        <div className="allproducts__title__search">
          <Meta title={searchQuery} />
          <div>Show Search Result:</div>
          <div>{searchQuery}</div>
        </div>
      ) : (
        <div className="allproducts__title">
          <Meta title="All Products" />
          <h1>All Products</h1>
          <LazyLoadImage
            wrapperClassName="allproducts__title__image"
            alt={"recommend_product"}
            effect="blur"
            src={BackgroundImg}
            placeholderSrc={BackgroundImg}
          />
        </div>
      )}
      <Sort />
      <div className="allproducts__listings">
        <div className="allproducts__leftPanelFilter__container">
          <Filter />
        </div>
        <Listing products={productListInfo.products} />
      </div>
      <Paginate page={productListInfo.page} pages={productListInfo.pages} />
    </div>
  );
}
