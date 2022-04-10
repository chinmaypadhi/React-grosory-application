import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import loginimage from "../images/registration-svg.png";
import Swal from "sweetalert2";
import "./SignUp.css";

const AdminLogin = () => {
  const [user, setUser] = useState({
    name: "",
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
    const { name, password } = user;

    if (name == "admin" && password == "password") {
      Swal.fire({
        position: "top",
        title: "Login Successful",
        icon: "success",
        showConfirmButton: true,
        timer: 1200,
      });
      history.replace("/adminpanel");
    } else {
      Swal.fire({
        position: "top",
        title: "Invalid username or password",
        icon: "error",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="login-content">
            <div className="elliot pt-5 ">
              <div className="login-form">
                <h2 className="form-title text-center">Admin Panel</h2>

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
                        <label for="name">Name</label>
                        <input
                          type="name"
                          name="name"
                          className="form-control"
                          id="name"
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
                          value="LOG IN"
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
    </>
  );
};

export default AdminLogin;
