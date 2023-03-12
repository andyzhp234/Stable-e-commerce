import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/action/apiUserAction";
import { adminGetProduct, adminUpdateProduct } from "../../lib/axiosAPI";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminEditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let { userInfo } = useSelector((state) => state.user);

  const [pending, setPending] = React.useState(true);
  const [error, setError] = React.useState();

  const [img, setImg] = React.useState([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [newArrivals, setNewArrivals] = React.useState(false);
  const [isRecommend, setIsRecommend] = React.useState(false);
  const [createSuccess, setCreateSuccess] = React.useState(false);

  React.useEffect(() => {
    adminGetProduct(userInfo, params.id)
      .then(function (res) {
        const data = res.data;
        setImg(data.images);
        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setBrand(data.brand);
        setPrice(data.price);
        setStock(data.countInStock);
        setIsRecommend(data.isRecommend);
        setNewArrivals(data.isNewArrival);
        setPending(false);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  }, [dispatch, params.id, userInfo]);

  const updateProductHandler = async (e) => {
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

    adminUpdateProduct(userInfo, params.id, formData)
      .then(function (res) {
        setCreateSuccess(true);
        setPending(false);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="auth">
      <DisplayPending pending={pending} />
      <form
        className="adminCreateProduct__container"
        onSubmit={updateProductHandler}
      >
        {createSuccess ? (
          <Alert severity="success">Update Succeed</Alert>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : null}
        <div className="auth__title">Edit Product</div>

        <div className="auth__input__container">
          <label htmlFor="update_name">Name: </label>
          <input
            id="update_name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="update_description">Description: </label>
          <textarea
            id="update_description"
            className="hide-scrollbar"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="auth__input__container">
          <label>Category: </label>
          <input
            id="update_category"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="update_brand">Brand: </label>
          <input
            id="update_brand"
            type="text"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="update_price">Price (In Cent): </label>
          <input
            id="update_price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min="0"
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="update_stock">Count In Stock: </label>
          <input
            id="update_stock"
            type="number"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            min="0"
            required
          />
        </div>

        <div className="auth__checkbox">
          <input
            id="update_newArrivals"
            type="checkbox"
            checked={newArrivals}
            onChange={(e) => setNewArrivals(!newArrivals)}
          />
          <label htmlFor="update_newArrivals">New Arrivals?</label>
        </div>
        <div className="auth__checkbox">
          <input
            id="update_recommend"
            type="checkbox"
            checked={isRecommend}
            onChange={(e) => setIsRecommend(!isRecommend)}
          />
          <label htmlFor="update_recommend">Recommend?</label>
        </div>

        <div className="product-image-upload__container">
          <label htmlFor="product-image-upload">Image: </label>
          <input
            id="product-image-upload"
            style={{ border: "none ", borderRadius: "0" }}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImg(e.target.files)}
          />
        </div>

        <button type="submit" className="auth-button green-button">
          Update
        </button>
        <button
          className="auth-button"
          type="submit"
          onClick={() => navigate("/admin/productlist")}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
