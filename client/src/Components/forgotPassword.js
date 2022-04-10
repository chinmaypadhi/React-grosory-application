import React, { useState } from "react";
import "./forgotPassword.css";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = (e) => {
    e.preventDefault();

    const { email } = user;
    fetch("api/v1/user/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
            title: data.message,
            icon: "success",
            text: "A passowrd reset link has been sent to your email",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="container">
        <div className="form-group row ">
          <label
            for="Email"
            className=" fpassword col-4 col-sm-6 col-lg-2 col-form-label mx-auto col-auto"
          >
            Enter Your Email
          </label>
          <div className=" col-5 col-sm-8 col-lg-8 col-auto">
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              id="inputPassword"
              onChange={handleChange}
            />
          </div>
          <div className="col-3 col-lg-2 ">
            <button
              type="submit"
              className="btn btn-outline-info mx-auto"
              onClick={PostData}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
