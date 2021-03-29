import { React, useState } from "react";
import Navbar from "./Navbar";
import UpdateProfile from "./UpdateProfile";
import Cookies from "js-cookie";
import Profile from "./Profile";
import Orders from "./Orders";
import Return from "./Return";
import OrderDetails from "./OrderDetails";
import OrdersData from "./OrdersData";
import Header from "./Header2";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import "./User.css";
import DeleteProfile from "./DeleteProfile";

function User() {
  const [isSubmittied, setIsSubmitted] = useState(false);
  const user_sequence_id = useParams();
  const [cookie, setCookie] = useState();

  function submitForm() {
    setIsSubmitted(true);
  }

  const getCookie = () => {
    const cookie = Cookies.get("user");
    console.log(cookie);
    setCookie(cookie);
  };

  return (
    <Router>
      <div className="user">
        <Switch>
          <Route path={`/user/${cookie}`}>
            <Header />
            <Orders />
          </Route>

          <Route path="/user/deleteprofile/:user_sequence_id">
            <Header />
            <DeleteProfile />
          </Route>

          <Route path="/user/updateprofile/:user_sequence_id">
            <Header />
            {!isSubmittied ? (
              <UpdateProfile submitForm={submitForm} />
            ) : (
              (window.location.href = "/home")
            )}
          </Route>
          <Route path="/user/deleteprofile/:user_sequence_id">
            <Header />
            <DeleteProfile />
          </Route>
          <Route exact path="/user/:user_sequence_id">
            <Header />
            <Profile />
          </Route>

          <Route path="/user/order/:user_sequence_id">
            <Header />
            <Orders />
          </Route>
          <Route path="/user/orderdata/:user_sequence_id">
            <Header />
            <OrdersData />
          </Route>
          <Route path="/user/orderdetail/:user_sequence_id">
            <Header />
            <OrderDetails />
          </Route>

          <Route path="/user/return/:order_id">
            <Header />
            <Return />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default User;
