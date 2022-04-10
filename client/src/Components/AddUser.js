// eslint-disable
import React, { Component } from "react";
import "./UserStyle.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const initialState = {
  username: "",
  useremail: "",
  userpassword: "",
  confirmuserpassword: "",
  address: "",
  phone: "",
  nameerror: "",
  emailerror: "",
  passworderror: "",
  confirmpassworderror: "",
  phoneerror: "",
  addresserror: "",
};

class AddUser extends React.Component {
  state = initialState;

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    let nameerror = "";
    let emailerror = "";
    let passworderror = "";
    let confirmpassworderror = "";
    let phoneerror = "";
    let addresserror = "";

    if (!this.state.username) {
      nameerror = "Please enter User Name";
    }

    if (!this.state.useremail) {
      emailerror = "Please enter User Email";
    }
    if (!this.state.phone) {
      phoneerror = "Please enter phone number";
    }
    if (!this.state.address) {
      addresserror = "please enter an address";
    }
    if (this.state.userpassword.length < 8 || this.state.userpassword == "") {
      passworderror = "Your password must be atleast 8 characters long";
    }
    if (this.state.confirmuserpassword != this.state.userpassword) {
      confirmpassworderror = " Password does not match ..!";
    }

    if (
      emailerror ||
      nameerror ||
      passworderror ||
      confirmpassworderror ||
      phoneerror ||
      addresserror
    ) {
      this.setState({
        nameerror,
        emailerror,
        passworderror,
        confirmpassworderror,
        phoneerror,
        addresserror,
      });
      return false;
    }
    swal("User Added Successfully!", "No warnings! ", "success");
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
    fetch("api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.username,
        email: this.state.useremail,
        password: this.state.userpassword,
        confirmPassword: this.state.confirmuserpassword,
        address: this.state.address,
        phone: this.state.phone,
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
      username: "",
      useremail: "",
      userpassword: "",
      confirmuserpassword: "",
      address: "",
      phone: "",
    });
  };

  render() {
    return (
      <div className="container">
        <div className="containr text-center">
          <br></br>
          <br></br>
          <br></br>
          <h1 className="o">Add Users</h1>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div className="container text-center mt-3">
          <form onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
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
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.nameerror}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
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
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.emailerror}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;User Password
              </label>
              <input
                name="userpassword"
                onChange={this.onChangeHandler}
                type="password"
                className="form-control"
                value={this.state.userpassword}
                required
              />
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.passworderror}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;Confirm
                Password
              </label>
              <input
                name="confirmuserpassword"
                onChange={this.onChangeHandler}
                type="password"
                className="form-control"
                value={this.state.confirmuserpassword}
                required
              />
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.confirmpassworderror}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;Address
              </label>
              <input
                name="address"
                onChange={this.onChangeHandler}
                type="text"
                className="form-control"
                value={this.state.address}
                required
              />
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.addresserror}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                <i class="fa fa-tags" aria-hidden="true"></i>&nbsp;Phone Number
              </label>
              <input
                name="phone"
                onChange={this.onChangeHandler}
                type="tel"
                className="form-control"
                value={this.state.phone}
                required
              />
              <div style={{ fontSize: 12, color: "darkblue" }}>
                {this.state.phoneerror}
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

export default AddUser;
