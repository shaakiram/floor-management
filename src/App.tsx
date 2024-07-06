import React from "react";
import "./AppStyles.scss";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import LeftComponent from "./components/LeftComponent/LeftComponent";
import FloatingComponent from "./components/FloatingComponent/FloatingComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideNavbar />
      <LeftComponent />
      <FloatingComponent />
    </div>
  );
};

export default App;
