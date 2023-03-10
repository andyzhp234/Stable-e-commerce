import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetProducts, adminDeleteProduct } from "../../lib/axiosAPI";
import { logout } from "../../redux/action/apiUserAction";
import Paginate from "../../components/Paginate/index.jsx";
import { useSearchParams } from "react-router-dom";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(true);
  const [error, setError] = React.useState();
  const [searchParams] = useSearchParams();
  const currPageQuery = searchParams.get("currPage");

  let { userInfo } = useSelector((state) => state.user);
  let [products, setProducts] = React.useState([]);

  const getAllProducts = useCallback(() => {
    adminGetProducts(userInfo, currPageQuery)
      .then(function (res) {
        setPending(false);
        setProducts(res.data);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  }, [dispatch, userInfo, currPageQuery]);

  const deleteProduct = (productID) => {
    window.scrollTo(0, 0);
    adminDeleteProduct(userInfo, productID)
      .then(function (res) {
        getAllProducts();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const handleDelete = (productID) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      deleteProduct(productID);
    }
  };

  React.useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className="admin__userlist">
      <DisplayPending pending={pending} />
      <div className="admin_userlist__container">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <div className="admin__userlist__title">Products</div>
        <div className="admin__userlist__list">
          <div className="admin_productlist__addproduct">
            <div
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/admin/createproduct");
              }}
            >
              Add New Product
            </div>
          </div>

          <div className="admin__userlist__list__title">
            <div>ID</div>
            <div>Name</div>
            <div>Price</div>
            <div>Category</div>
            <div>Edit/Delete</div>
          </div>
          {products.products?.map((product) => {
            return (
              <div key={product._id} className="admin__userlist__list__user">
                <div>{product._id}</div>
                <div>{product.name}</div>
                <div>$ {product.price / 100}</div>
                <div>{product.category}</div>
                <div>
                  <img
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                    alt="edit_icon"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/admin/editproduct/${product._id}`);
                    }}
                  />
                  <img
                    onClick={() => handleDelete(product._id)}
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                    alt="edit_icon"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Paginate page={products.page} pages={products.pages} />
      </div>
    </div>
  );
}
