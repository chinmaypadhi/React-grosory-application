import React, { useEffect, useState } from "react";
import Product from "../Product";
import "./ProductPage.css";
import { Form, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//actions
import { getGrocProducts as grocproducts } from "../../redux/actions/productActions";
import * as reactBootStrap from "react-bootstrap";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const GrocPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getgrocproducts = useSelector((state) => state.getGrocProducts);
  const { products, loading, error } = getgrocproducts;

  useEffect(() => {
    dispatch(grocproducts());
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
          // <reactBootStrap.Spinner animation="border" variant="success" />
          <SkeletonTheme color="#202020" highlightColor="#444">
            <p>
              <Skeleton count={15} duration={2} />
            </p>
          </SkeletonTheme>
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
            .map((product1) => (
              <Product
                key={product1._id}
                productId={product1._id}
                name={product1.name}
                price={product1.price}
                description={product1.description}
                imageCover={product1.imageCover}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default GrocPage;
