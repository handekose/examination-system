import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/SidebarStudent";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: sidebarImage,
      color: "blue",
      hasImage: true,
      mainPanel: React.createRef(null)
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.state.mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/student") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={true}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return <>
      <div className="wrapper">
        <Sidebar color={this.state.color} image={this.state.hasImage ? this.state.image : ""} routes={routes} />
        <div className="main-panel" ref={this.state.mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={this.state.hasImage}
        color={this.state.color}
        image={this.state.image}
      />
    </>
  }
  
}
export default AdminLayout;
