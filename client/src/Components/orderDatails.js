import React, { Component } from "react";
import "./AdminStyle.css";
import { Link } from "react-router-dom";
import loader from "./loader.gif";
import axios from "axios";

class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
    };
  }

  async componentDidMount() {
    return axios
      .get("api/v1/order/orderdetails")

      .then((res) => {
        const data = res.data;
        this.setState(
          {
            isLoading: false,
            users: data,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container mt-5">
          <center>
            <img src={loader} alt="loader" className="myloader" />
            <p>Loading Please wait ...</p>
          </center>
        </div>
      );
    } else {
      return (
        <div className="q">
          <div className="container">
            <div className="containr text-center">
              <h2 className="d">Order Details</h2>
            </div>
            <div></div>
            <br></br>
            <div className="row float-center mt-6 mb-3">
              {/* <h2 className="mr-4">
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                &nbsp;Add Store Managers
              </h2> */}

              {/* <Link to="/signup">
                <button className="btn btn-dark" type="submit">
                  <i className="fa fa-plus"></i>&nbsp;Add New
                </button>
              </Link> */}
            </div>
            <hr></hr>
            <br></br>
            <br></br>
            <div className="row float-center mt-6 mb-3">
              {/* <h2 className="mr-4">
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                &nbsp;Categories
              </h2> */}

              <Link to="/cancelOrder" exact>
                <button className="btn btn-primary mr-4 ">
                  <i className="fa fa-ban"></i>&nbsp;Cancel Order
                </button>
              </Link>
            </div>
            <br></br>
            <div className="container text-center mt-2">
              <table className="table">
                <thead>
                  <tr className="title">
                    <th scope="col">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      &nbsp;Name
                    </th>
                    <th scope="col">
                      <i className="fa fa-id-card" aria-hidden="true"></i>
                      &nbsp;Id
                    </th>
                    <th scope="col">
                      <i className="fa fa-phone-square" aria-hidden="true"></i>
                      &nbsp;Phone
                    </th>
                    <th scope="col">
                      <i
                        className="fa fa-location-arrow"
                        aria-hidden="true"
                      ></i>
                      &nbsp;Pin
                    </th>
                    <th scope="col">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      &nbsp;Address
                    </th>
                    <th scope="col">
                      <i className="fa fa-neuter" aria-hidden="true"></i>
                      &nbsp;Landmark
                    </th>
                    <th scope="col">
                      <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                      &nbsp;Products
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((data, id) => (
                    <tr id={id}>
                      <td>&nbsp;{data.name}</td>
                      <td>{data._id}</td>
                      <td>{data.phone}</td>
                      <td>{data.pin}</td>
                      <td>{data.address1}</td>
                      <td>{data.landmark}</td>
                      <td>{data.productsName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br></br>
          </div>
        </div>
      );
    }
  }
}

export default OrderDetailsPage;
