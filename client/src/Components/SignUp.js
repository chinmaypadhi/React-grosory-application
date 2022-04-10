import React, { useState } from "react";
import signupimage from "../images/login-illustration.jpg";
import "./SignUp.css";
import Swal from "sweetalert2";

import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const history = useHistory();

  const PostData = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, address, phone } = user;

    fetch("api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        address,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          Swal.fire({
            position: "top",
            title: data.message,
            icon: "error",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "top",
            title: "Registration Successful",
            text: "Please login again to continue",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });
          history.push("/login");
        }
      });
  };

  return (
    <div>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="elliot pt-5 ">
              <div className="signup-form">
                <h2 className="form-title text-center">SIGN UP</h2>

                <div className="row my-5">
                  <div className="col-12 col-lg-6 mt-3">
                    <div className="signup-image">
                      <figure>
                        <img src={signupimage} />
                      </figure>
                    </div>
                  </div>

                  <div
                    className="col-9 col-lg-5
                     mx-auto my-5"
                  >
                    <form
                      method="POST"
                      className="register-form"
                      id="register-form"
                    >
                      <div className="form-group">
                        <label for="name">Username</label>
                        <input
                          name="name"
                          type="name"
                          className="form-control"
                          onChange={handleInput}
                          id="name"
                          value={user.name}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Email address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          onChange={handleInput}
                          id="email"
                          value={user.email}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={handleInput}
                          id="password"
                          value={user.password}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label for="password"> Confirm Password</label>
                        <input
                          name="confirmPassword"
                          type="password"
                          className="form-control"
                          onChange={handleInput}
                          value={user.confirmPassword}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label for="address">Address</label>
                        <input
                          type="address"
                          name="address"
                          className="form-control"
                          onChange={handleInput}
                          id="address"
                          value={user.address}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label for="Phone">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          id="phone"
                          onChange={handleInput}
                          maxLength="10"
                          value={user.phone}
                          required
                        />
                      </div>

                      <div className="form-group form-button mt-4">
                        <input
                          type="submit"
                          name="signup"
                          id="signup"
                          onClick={PostData}
                          className="form-submit btn  btn-primary "
                          value="SIGN UP"
                          required
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
