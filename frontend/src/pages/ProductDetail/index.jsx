import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../../redux/action/apiProductDetail";
import { useParams } from "react-router-dom";
import Ratings from "../../components/Ratings";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import AddCart from "./AddCart";
import WriteComments from "./WriteComments";
import SeeComments from "./SeeComments";

export default function ProductPage() {
  const dispatch = useDispatch();
  const params = useParams();

  // Redux
  const productDetail = useSelector((state) => state.productDetail);
  const { pending, error, errorMessage, productInfo } = productDetail;

  const [currImg, setCurrImg] = React.useState(0);
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetail(params.id, dispatch);
  }, [dispatch, params.id]);

  return (
    <div>
      <Meta title={productInfo.name} />
      {pending ? (
        <DisplayPending pending={pending} />
      ) : error ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <div className="productDetailPage">
          <img
            className="productDetailPage__mainImg shadow-4D"
            src={productInfo.images?.[currImg]}
            alt="product_images"
          />

          <div className="productDetailPage__imgPagination">
            {productInfo.images?.map((img, index) => {
              return (
                <img
                  className={
                    currImg === index
                      ? "productDetailPage__imgPagination--selected"
                      : "productDetailPage__imgPagination--notSelected"
                  }
                  src={img}
                  alt={index}
                  key={index}
                  onClick={(e) => setCurrImg(parseInt(e.target.alt))}
                />
              );
            })}
          </div>

          <div className="product_detail_descriptions">
            <div className="product_detail_title">{productInfo.name}</div>
            <div className="product_detail_rating">
              <Ratings product={productInfo} />
            </div>

            <AddCart
              productInfo={productInfo}
              count={count}
              setCount={setCount}
            />

            <div className="productDetailPage__description">
              <h1>Descrption:</h1>
              <p>{productInfo.description}</p>
            </div>

            <WriteComments productInfo={productInfo} params={params} />
            <SeeComments productInfo={productInfo} />
          </div>
        </div>
      )}
    </div>
  );
}
