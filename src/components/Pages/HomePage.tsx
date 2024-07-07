import React from "react";
//components
import SideNavbar from "../SideNavbar/SideNavbar";
//scss
import "../../AppStyles.scss";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <SideNavbar />
    </div>
  );
};

export default HomePage;
