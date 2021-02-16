import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "index.css";

import AdminPrivateRoute from "components/PrivateRoutes/AdminPrivateRoute";
import StudentPrivateRoute from "components/PrivateRoutes/StudentPrivateRoute";
import TeacherPrivateRoute from "components/PrivateRoutes/TeacherPrivateRoute";

import AdminLayout from "layouts/Admin.js";
import StudentLayout from "layouts/Student.js";
import TeacherLayout from "layouts/Teacher.js";
import LoginView from "./views/login/Login";

let prepareRouter = () => {
  let userId = localStorage.getItem("userId");
  let userType = localStorage.getItem("userType");

  if (!userId || !userType) {
    return null
  }
  else {
    switch (userType) {
      case "admin":
        return <>
          <Route path="/admin" component={AdminLayout} />
        </>
      case "student":
        return <>
          <Route path="/student" component={StudentLayout} />
        </>
      case "teacher":
        return <>
          <Route path="/teacher" component={TeacherLayout} />
        </>
      default:
        return null
    }
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* {prepareRouter()} */}
      {/* <Route path="/login" component={LoginView} />
      <Redirect from="/" to="/login" /> */}
      <AdminPrivateRoute path="/admin" component={AdminLayout} />
      <StudentPrivateRoute path="/student" component={StudentLayout} />
      <TeacherPrivateRoute path="/teacher" component={TeacherLayout} />
      <Route path="/login" component={LoginView} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
