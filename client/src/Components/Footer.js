import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className=" text-center text-white bg-dark my_footer">
        <div className="container p-3">
          <section className="mb-4 ">
            <a
              className="btn btn-outline-light btn-floating m-3"
              href="/"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-3"
              href="/"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-3"
              href="/"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-3"
              href="/"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </section>

          <section className="">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 ">
                    <i className="fas fa-gem me-3 "></i> CITY EXPRESS
                  </h6>
                  <p className="footer_desc">
                    Freshness is on focus. Because you deserve to eat fresh.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 ">
                  <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      VEGETABLES
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      GROCERY
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      ABOUT US
                    </a>
                  </p>
                </div>

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 ">Contact</h6>
                  <p className="conct_details">
                    <i className="fas fa-home me-3 "></i> Bhubaneswar
                  </p>
                  <p className="conct_details">
                    <i className="fas fa-envelope me-3"></i>{" "}
                    cityexpress058@gmail.com
                  </p>
                  <p className="conct_details">
                    <i className="fas fa-phone me-3"></i> + 01 234 567 88
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className=" my-footer text-center p-3 ">
          © 2020 Copyright:
          <a className="text-white"> CITY EXPRESS</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
