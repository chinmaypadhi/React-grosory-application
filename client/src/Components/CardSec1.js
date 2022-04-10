import React from "react";
import "./CardSec.css";
import image1 from "../images/vegetable1.png";
import image2 from "../images/carousel8.1.png";
import { Link } from "react-router-dom";

const CardSec1 = () => {
  return (
    <>
      <section id="header" className="d-flex align-items-center mt-md-3">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-2 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h1 className="slogan">
                    Order fresh
                    <strong className="brand-name">
                      <br />
                      Vegetables
                    </strong>{" "}
                    with City Express
                  </h1>
                  <p className="my-3 my_font">
                    We offer a wide range of food products for all your everyday
                    needs .At present we do home deliver of fresh vegetables in
                    bhubaneswar, cuttack within 12 hours from the time of buying
                    fruits or vegetables online.
                  </p>
                  <div className="mt-3">
                    <Link to="/vegproducts" className="btn-get-started">
                      Buy Vegetables
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 pt-md-3 order-1 order-lg-2 header-img">
                  <img src={image1} className="img-fluid " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="header" className="d-flex align-items-center mt-md-3">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-2 order-2 order-lg-1 d-flex justify-content-center flex-column ">
                  <h1 className="slogan">
                    Order your daily
                    <strong className="brand-name1">
                      <br />
                      Grocery{" "}
                    </strong>
                    with City Express
                  </h1>
                  <p className="my-3 my_font">
                    We offer a wide range of food products for all your everyday
                    needs and even offer grocery home delivery as well as Buy
                    Grocery Online for you to purchase from.
                  </p>
                  <div className="mt-3">
                    <Link to="/grocproducts" className="btn-get-started">
                      Buy Groceries
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 px-md-5 order-md-1 order-lg-1 header-img">
                  <img src={image2} className="img-fluid " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardSec1;
