import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import image1 from "../images/grocery.jpg";

import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MyNavbar = () => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };
  return (
    <Navbar collapseOnSelect className="navbar" variant="dark" expand="lg">
      <Navbar.Brand className="text-light">
        {/* <img alt="" src={image1} className="my_logo d-inline-block align-top" />{" "} */}
        City Express
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-5">
          <Nav.Link to="/" exact as={NavLink} eventKey="0">
            Home
          </Nav.Link>

          <NavDropdown title="Products" id="collasible-nav-dropdown">
            <NavDropdown.Item to="/vegproducts" as={NavLink} eventKey="3">
              Vagetables
            </NavDropdown.Item>
            <NavDropdown.Item to="/grocproducts" as={NavLink} eventKey="4">
              Grocery
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link to="/login" as={NavLink} eventKey="1">
            Login
          </Nav.Link>

          <Nav.Link
            to="/cartpage"
            className="my-cart"
            as={NavLink}
            eventKey="2"
          >
            <i class="fas fa-shopping-cart"></i>
            <span activeClassName="active">{getCartCount()}</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
