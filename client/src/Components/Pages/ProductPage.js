import React, { useEffect, useState } from "react";
import Product from "../Product";
import "./ProductPage.css";
import { Form, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//actions
import { getVegProducts as vegproducts } from "../../redux/actions/productActions";
import * as reactBootStrap from "react-bootstrap";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getVegProducts);

  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(vegproducts());
  }, [dispatch]);
  return (
    <div className="productScreen">
      <div className="search">
        <h2 className="productScreen__title">Our Products</h2>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search..."
            className=" mr-sm-2"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Form>
      </div>

      <div className="productScreen__products">
        {loading ? (
          <reactBootStrap.Spinner animation="border" variant="success" />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((product) => (
              <Product
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                imageCover={product.imageCover}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default ProductPage;
