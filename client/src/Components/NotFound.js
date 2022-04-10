import React from "react";
import "./NotFound.css";
import errorpage from "../images/404 error.png";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-5 mx-auto">
            <figure>
              <img src={errorpage} />
            </figure>
          </div>

          <div className="col-12 col-lg-7 my-auto">
            <h1 className="error">RETURN TO HOME PAGE</h1>
            <ul key="nav">
              <li className="my_btn">
                <NavLink className="my_link" to="/">
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
