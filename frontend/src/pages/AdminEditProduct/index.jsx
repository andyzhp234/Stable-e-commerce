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
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
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
          onSubmit={updateProductHandler}
        >
          {createSuccess ? (
            <Alert severity="success">Update Succeed</Alert>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : null}
          <div className="admin-create-product__title">Edit Product</div>

          <div className="admin-create-product__description">
            <div>Name: </div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Description: </div>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Category: </div>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Brand: </div>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Price (In Cent): </div>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              min="0"
              required
            />
          </div>
          <div className="admin-create-product__description">
            <div>Count In Stock: </div>
            <input
              type="number"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
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
              checked={newArrivals}
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
              checked={isRecommend}
              onChange={(e) => setIsRecommend(!isRecommend)}
            />
          </div>
          <div className="admin-create-product__description">
            <div>Image: </div>
            {/* {Array.isArray(img) &&
              img.map((i) => {
                return <div key={i}>filename: {i}</div>;
              })} */}

            <input
              style={{ border: "none ", borderRadius: "0" }}
              type="file"
              id="product-image-upload"
              accept="image/*"
              multiple
              onChange={(e) => setImg(e.target.files)}
            />
          </div>

          <button type="submit" className="create-product-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
