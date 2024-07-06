import React from "react";
import "./AppStyles.scss";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import LeftComponent from "./components/LeftComponent/LeftComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideNavbar />
      <LeftComponent />
    </div>
  );
};

export default App;
