import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { LoginPage } from "layouts/LoginPage";

var token = localStorage.getItem("token");

fetch(process.env.REACT_APP_SERVER + "auth/check-token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
})
  .then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      localStorage.removeItem("token");
      ReactDOM.render(<LoginPage />, document.getElementById("root"));
      throw new Error("Invalid Token");
    }
  })
  .then(data => {
    ReactDOM.render(
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>,
      document.getElementById("root")
    );
  })
  .catch((e) => {
    /*ReactDOM.render(
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>,
      document.getElementById("root")
    );*/
    // ReactDOM.render(<LoginPage />, document.getElementById("root"));

    //    ReactDOM.render(<h1>Server nedostupan</h1>, document.getElementById("root"));
  })

