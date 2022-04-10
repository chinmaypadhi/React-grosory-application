// eslint-disable
import React, { Component } from "react";
import "./UserStyle.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const initialState = {
  username: "",
  useremail: "",
  userid: "",
  nameerror: "",
  emailerror: "",
  iderror: "",
};

class UpdateUser extends React.Component {
  state = initialState;

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    let iderror = "";
    let nameerror = "";
    let emailerror = "";

    if (!this.state.userid) {
      iderror = "Please enter User Id";
    }
    if (!this.state.username) {
      nameerror = "Please enter User Name";
    }

    if (!this.state.useremail) {
      emailerror = "Please enter User Email";
    }

    if (emailerror || nameerror) {
      this.setState({
        nameerror,
        emailerror,
        iderror,
      });
      return false;
    }
    swal("Updated Successfully!", "No warnings! ", "success");
    return true;
  };

  onSubmitHandler = (e) => {
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state.username);
      console.log(this.state.useremail);

      //clear form
      this.setState(initialState);
    }

    // if(this.state.catid == null && this.state.catname == null){
    //   return alert("Cannot submit empty fields")
    // }
    fetch(`api/v1/user/${this.state.userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.username,
        email: this.state.useremail,
      }),
    })
      .then(function (callback) {
        console.log(callback.json());
      })
      .catch((error) => {
        console.log(error);
      });
    e.preventDefault();
    this.setState({
      userid: "",
      username: "",
      useremail: "",
    });
  };

  render() {
    return (
      <div className="container">
        <div className="containr text-center">
          <h1 className="o">Update Users</h1>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="container text-center mt-3">
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="userid">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;User Id
              </label>
              <input
                name="userid"
                onChange={this.onChangeHandler}
                type="text"
                className="form-control "
                value={this.state.userid}
                required
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.iderror}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;User Name
              </label>
              <input
                name="username"
                onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                value={this.state.username}
                required
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameerror}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="useremail">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;User Email
              </label>
              <input
                name="useremail"
                onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                value={this.state.useremail}
                required
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailerror}
              </div>
            </div>

            <br></br>
            <br></br>
            <div className="form-group">
              <button className="btn btn-dark" onClick={this.onSubmitHandler}>
                <i className="fa fa-send"></i>&nbsp; Submit
              </button>
              <Link to="/adminpanel">
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

export default UpdateUser;
