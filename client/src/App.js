import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home";
import ProductPage from "./Components/Pages/ProductPage";
import GrocPage from "./Components/Pages/grocProducts";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import ForgotPassword from "./Components/forgotPassword";
import ProductScreen from "./Components/Pages/ProductScreen";
import CartScreen from "./Components/Pages/CartScreen";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import OrderPage from "./Components/orderPage";
import UpdateUser from "./Components/UpdateUser";
import Adminpannel from "./Components/Adminpannel";
import AddUser from "./Components/AddUser";
import DeleteUser from "./Components/DeleteUser";
import OrderDetailsPage from "./Components/orderDatails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CancelOrder from "./Components/cancelOrder";
import AdminLogin from "./Components/AdminLogin";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Home />
            <Footer />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Navbar />
            <SignIn />
          </Route>
          <Route path="/vegproducts" exact>
            <Navbar />
            <ProductPage />
            <Footer />
          </Route>
          <Route path="/grocproducts" exact>
            <Navbar />
            <GrocPage />
            <Footer />
          </Route>
          <Route path="/product/:id" component={ProductScreen} exact />

          <Route path="/cartpage" exact>
            <Navbar />
            <CartScreen />
            <Footer />
          </Route>
          <Route path="/forgotpassword" component={ForgotPassword} exact />
          <Route
            path="/resetpassword/:id"
            component={ResetPasswordPage}
            exact
          />

          <Route path="/order" exact>
            <Navbar />
            <OrderPage />
            <Footer />
          </Route>

          <Route path="/updateUser" exact>
            <UpdateUser />
          </Route>
          <Route path="/adminlogin" exact>
            <AdminLogin />
          </Route>
          <Route path="/adminpanel" exact>
            <Adminpannel />
          </Route>

          <Route path="/adduser" exact>
            <AddUser />
          </Route>
          <Route path="/deleteuser" exact>
            <DeleteUser />
          </Route>
          <Route path="/orderdetails" exact>
            <OrderDetailsPage />
          </Route>
          <Route path="/cancelOrder" exact>
            <CancelOrder />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}
