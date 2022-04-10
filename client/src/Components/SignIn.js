import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import loginimage from "../images/signin-illustrator.jpg";
import Swal from "sweetalert2";
import "./SignUp.css";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = (e) => {
    e.preventDefault();
    const { email, password } = user;

    fetch("api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
            title: "Login Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
          });

          history.replace("/");
        }
      });
  };

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="login-content">
            <div className="elliot pt-5 ">
              <div className="login-form">
                <h2 className="form-title text-center">Welcome Back !!</h2>

                <div className="row my-5">
                  <div className="col-12 col-lg-6 mt-3">
                    <div className="login-image">
                      <figure>
                        <img src={loginimage} />
                      </figure>
                    </div>
                  </div>

                  <div
                    className="col-9 col-lg-5
                     mx-auto my-5"
                  >
                    <form className="login-form" id="login-form">
                      <div className="form-group">
                        <label for="email">Email address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>

                      <div className="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="password"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>

                      <div className="form-group form-button d-flex align-items-center justify-content-between">
                        <input
                          type="submit"
                          name="login"
                          id="login"
                          onClick={PostData}
                          className="form-submit btn  btn-outline-info "
                          value="SIGN IN"
                        />

                        <p className="mt-3">
                          <NavLink
                            to="/forgotpassword"
                            activeClassName="active"
                          >
                            Forgot Password?
                          </NavLink>
                        </p>
                      </div>

                      <div className="pt-4">
                        <p className="text-secondary text-left">
                          Don't have an account?
                          <NavLink to="/signup" activeClassName="active">
                            {" "}
                            Signup
                          </NavLink>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
