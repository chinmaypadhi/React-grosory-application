import React, { useEffect } from "react";
import "./CartScreen.css";
import CartItem from "../CartItems";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { exact } from "prop-types";

const CartScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const callCheckoutPage = () => {
    const token = Cookies.get("token");
    if (token) {
      history.push("/order");
    } else {
      Swal.fire({
        position: "top",
        title: "Please Login To Continue",
        icon: "error",
        showConfirmButton: true,
      });
      history.replace("/login");
    }
  };

  // useEffect(() => {
  //   callCheckoutPage();
  // }, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your Cart Is Empty{" "}
            <Link onClick={() => history.goBack()}>Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>
      <div className="cartscreen__right">
        <div className="cartscreen__info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>₹{getCartTotal().toFixed(2)}</p>
        </div>

        <div>
          <button disabled={!cartItems.length} onClick={callCheckoutPage}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
