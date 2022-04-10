import React, { Component } from "react";
import "./AdminStyle.css";
import { Link } from "react-router-dom";
import loader from "./loader.gif";
import axios from "axios";

class Adminpannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
    };
  }

  async componentDidMount() {
    return axios
      .get("api/v1/user/")

      .then((res) => {
        const data = res.data.data.allUser;
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
              <h2 className="d">Admin Dashboard</h2>
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
              <Link to="/adduser" exact>
                <button className="btn btn-dark mr-4">
                  <i className="fa fa-plus"></i>&nbsp;Create User
                </button>
              </Link>
              <Link to="/updateUser" exact>
                <button className="btn btn-info mr-4">
                  <i className="fa fa-edit"></i>&nbsp;Update User
                </button>
              </Link>
              <Link to="/deleteuser" exact>
                <button className="btn btn-danger mr-4">
                  <i className="fa fa-trash"></i>&nbsp;Delete User
                </button>
              </Link>
              <Link to="/orderdetails" exact>
                <button className="btn btn-success mr-4">
                  <i className="fa fa-info"></i>&nbsp;Order Details
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
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      &nbsp;Email
                    </th>
                    <th scope="col">
                      <i class="fa fa-id-card" aria-hidden="true"></i>
                      &nbsp;Id
                    </th>
                    <th scope="col">
                      <i class="fa fa-user" aria-hidden="true"></i>
                      &nbsp;Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((data, id) => (
                    <tr id={id}>
                      <td>
                        <i class="fa fa-check-square" aria-hidden="true"></i>
                        &nbsp;{data.name}
                      </td>
                      <td>{data.email}</td>
                      <td>{data._id}</td>
                      <td>{data.createdAt}</td>
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

export default Adminpannel;
