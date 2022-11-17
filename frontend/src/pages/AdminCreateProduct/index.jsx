import React from "react";
import { logout } from "../../redux/action/apiUserAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminCreateProduct } from "../../lib/axiosAPI";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminCreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { userInfo } = useSelector((state) => state.user);

  const [img, setImg] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [newArrivals, setNewArrivals] = React.useState(false);
  const [isRecommend, setIsRecommend] = React.useState(false);

  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState();
  const [createSuccess, setCreateSuccess] = React.useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setPending(true);

    const formData = new FormData();

    for (let i = 0; i < img.length; i++) {
      formData.append("images", img[i]);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("countInStock", stock);
    formData.append("newArrivals", newArrivals);
    formData.append("isRecommend", isRecommend);

    adminCreateProduct(userInfo, formData)
      .then(function (res) {
        setPending(false);
        setCreateSuccess(true);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
        setCreateSuccess(false);
      });
  };

  return (
    <div className="admin-create-product">
      <DisplayPending pending={pending} />
      <div
        className="admin-create-product__go-back"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </div>
      <div className="admin-create-product__body">
        <form
          className="admin-create-product__container"
          onSubmit={submitHandler}
        >
          {createSuccess ? (
            <Alert severity="success">Upload Succeed</Alert>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : null}

          <div className="admin-create-product__title">Create new Product</div>

          <div className="admin-create-product__description">
            <div>Name: </div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Description: </div>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Category: </div>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Brand: </div>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Price (In Cent): </div>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Count In Stock: </div>
            <input
              type="number"
              onChange={(e) => setStock(e.target.value)}
              min="0"
              required
            />
          </div>
          <div
            className="admin-create-product__description"
            style={{ display: "flex", alignItems: "center" }}
          >
            New Arrivals?
            <input
              style={{
                width: "30px",
                height: "30px",
                margin: "0",
                marginLeft: "20px",
              }}
              type="checkbox"
              onChange={(e) => setNewArrivals(!newArrivals)}
            />
          </div>
          <div
            className="admin-create-product__description"
            style={{ display: "flex", alignItems: "center" }}
          >
            Recommend?
            <input
              style={{
                width: "30px",
                height: "30px",
                margin: "0",
                marginLeft: "20px",
              }}
              type="checkbox"
              onChange={(e) => setIsRecommend(!isRecommend)}
            />
          </div>
          <div className="admin-create-product__description">
            <div>Image: </div>
            <input
              style={{ border: "none ", borderRadius: "0" }}
              type="file"
              id="product-image-upload"
              multiple
              accept="image/*"
              onChange={(e) => setImg(e.target.files)}
              required
            />
          </div>

          <button type="submit" className="create-product-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
