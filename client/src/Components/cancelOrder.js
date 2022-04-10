// eslint-disable
import React, { Component } from "react";
import "./UserStyle.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const initialState = {
  userid: "",
  iderror: "",
};

class CancelOrder extends React.Component {
  state = initialState;

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    let iderror = "";

    if (!this.state.userid) {
      iderror = "Please enter Order Id";
    }

    if (iderror) {
      this.setState({
        iderror,
      });
      return false;
    }
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Cancellation Confirmed", {
          icon: "success",
          buttons: false,
        });
      } else {
        swal("Unable to delete the Product!!!");
      }
    });
    return true;
  };

  onSubmitHandler = (e) => {
    const isValid = this.validate();
    if (isValid) {
      //clear form
      this.setState(initialState);
    }

    // if(this.state.catid == null && this.state.catname == null){
    //   return alert("Cannot submit empty fields")
    // }
    fetch(`api/v1/order/cancelorder/${this.state.userid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: this.state.userid,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
    this.setState({
      userid: "",
    });
  };

  render() {
    return (
      <div className="container">
        <div className="containr text-center">
          <br></br>
          <br></br>
          <br></br>
          <h1 className="o">Cancel Order</h1>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="container text-center mt-3">
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="userid">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;Order Id
              </label>
              <input
                name="userid"
                onChange={this.onChangeHandler}
                type="text"
                className="delete_form form-control"
                value={this.state.userid}
                required
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.iderror}
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group">
              <button className="btn btn-dark" onClick={this.onSubmitHandler}>
                <i className="fa fa-send"></i>&nbsp; Submit
              </button>
              <Link to="/orderdetails">
                <button className="btn btn-info ml-2">
                  <i className="fa fa-arrow-left"></i>&nbsp; Back to Dashboard
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CancelOrder;
