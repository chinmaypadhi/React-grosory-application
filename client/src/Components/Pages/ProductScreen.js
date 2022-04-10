import React, { useState, useEffect } from "react";
import "./ProductScreen.css";
import { useDispatch, useSelector } from "react-redux";
import * as reactBootStrap from "react-bootstrap";

import { getProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cartpage");
  };
  return (
    <div className="productscreen">
      {loading ? (
        <div className="spinner">
          <reactBootStrap.Spinner animation="grow" variant="success" />
          <reactBootStrap.Spinner animation="grow" variant="primary" />
          <reactBootStrap.Spinner animation="grow" variant="secondary" />
          <reactBootStrap.Spinner animation="grow" variant="info" />
          <reactBootStrap.Spinner animation="grow" variant="warning" />
        </div>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageCover} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          </div>

          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:<span>₹{product.price}</span>
              </p>
              <p>
                Status:<span>In Stock</span>
              </p>
              {/* {console.log([...Array(product.countInStock).keys()])} */}
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  {" "}
                  Add To Cart{" "}
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
