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
    <div className="admin-list">
      <DisplayPending pending={pending} />
      <div className="admin-list__container">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <div
          className="admin-add-button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/admin/createproduct");
          }}
        >
          Add New Product
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.products?.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price / 100}</td>
                  <td>{product.category}</td>
                  <td>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginate page={products.page} pages={products.pages} />
      </div>
    </div>
  );
}
