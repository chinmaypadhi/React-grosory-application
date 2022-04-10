import React, { useState } from "react";
import "./orderPage.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderPage() {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const getCartTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };

  const getCartItemsName = () => {
    return cartItems.map((items) => items.name);
  };

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    pin: "",
    address1: "",
    address2: "",
    landmark: "",
    price: `${getCartTotal()}`,
    productsName: `${getCartItemsName()}`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const PostData = (e) => {
    e.preventDefault();

    const {
      name,
      phone,
      pin,
      address1,
      address2,
      landmark,
      price,
      productsName,
    } = userDetails;
    fetch("api/v1/order/newOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        pin,
        address1,
        address2,
        landmark,
        price,
        productsName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          Swal.fire({
            position: "top",
            title: data.message,
            icon: "error",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "top",
            title: "Your Order Placed Successfully ✅",
            icon: "success",
            showConfirmButton: false,
            timer: 3500,
          });
          history.replace("/");
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="order_page">
          <div className="order_content p-5">
            <h2 className="form-title text-center">Order Now</h2>

            <div className="row">
              <div className="col-12 col-lg-6 col-auto">
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label for="name">Full Name</label>
                    <input
                      name="name"
                      type="name"
                      className="form-control form-control-sm"
                      id="name"
                      onChange={handleChange}
                      value={userDetails.name}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label for="Phone">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control form-control-sm"
                      id="phone"
                      maxLength="10"
                      onChange={handleChange}
                      value={userDetails.phone}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label for="pincode">Pin Code</label>
                    <select
                      class="form-control form-control-sm"
                      name="pin"
                      onChange={handleChange}
                      value={userDetails.pin}
                    >
                      <option>pincode</option>
                      <option>751001</option>
                      <option>752103</option>
                      <option>751022</option>
                      <option>751020</option>
                      <option>751019</option>
                      <option>751009</option>
                      <option>751014</option>
                      <option>751018</option>
                      <option>752100</option>
                      <option>751011</option>
                      <option>751016</option>
                      <option>751019</option>
                      <option>751025</option>
                      <option>751003</option>
                      <option>751015</option>
                      <option>751006</option>
                      <option>751024</option>
                      <option>751019</option>
                      <option>751006</option>
                      <option>751030</option>
                      <option>751017</option>
                      <option>751012</option>
                      <option>751002</option>
                      <option>752101</option>
                      <option>751024</option>
                      <option>751010</option>
                      <option>751007</option>
                      <option>751021</option>
                      <option>751005</option>
                      <option>751004</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="Address1">
                      Flat, House no.., Company, Building, Apartment
                    </label>
                    <input
                      name="address1"
                      type="text"
                      className="form-control form-control-sm"
                      onChange={handleChange}
                      value={userDetails.address1}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="Address2">
                      Area, Colony, Street, Sector, Village
                    </label>
                    <input
                      name="address2"
                      type="text"
                      className="form-control form-control-sm"
                      onChange={handleChange}
                      value={userDetails.address2}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="landmark">Landmark</label>
                    <input
                      name="landmark"
                      type="text"
                      className="form-control form-control-sm"
                      onChange={handleChange}
                      value={userDetails.landmark}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-6 ">
                <h5 className="my_font text-center mt-5">
                  Total Price: <span>₹{getCartTotal().toFixed(2)}</span>
                </h5>
                <p className="text-center mt-2">
                  <strong className="cod">
                    Payment Method: Cash On Delivery
                  </strong>
                </p>

                <div className="form-group form-button text-center mt-5">
                  <input
                    type="submit"
                    name="order"
                    id="order"
                    className="form-submit btn  btn-warning "
                    value="Order Now"
                    onClick={PostData}
                    required
                  />
                </div>
                <p className="message  text-center">
                  * Items will be delivered within 2-4 hours form the time of
                  purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderPage;
