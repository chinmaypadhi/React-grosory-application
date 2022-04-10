import React, { useState } from "react";
import "./ResetPasswordPage.css";
import Swal from "sweetalert2";

function ResetPasswordPage({ match, history }) {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(match.params.id);

    setUser({ ...user, [name]: value });
  };

  const PostData = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = user;

    fetch(`/api/v1/user/resetPassword/${match.params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        confirmPassword,
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
            text: "Login again to continue",
            showConfirmButton: false,
            timer: 3500,
          });
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <h2 className="form-title text-center">Reset Your Password</h2>
        <div className="row">
          <div
            className="col-9 col-lg-5
                     mx-auto my-5"
          >
            <form className="login-form" id="login-form">
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  autoComplete="off"
                  placeholder=" New Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmpassword"
                  autoComplete="off"
                  placeholder=" Confirm New Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-button d-flex align-items-center justify-content-between">
                <input
                  type="submit"
                  name="login"
                  id="login"
                  className="form-submit btn btn-md btn-primary btn-block "
                  value="submit"
                  onClick={PostData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
