import React from "react";
import "./SideNavbarStyles.scss";
import home from "../../assets/images/home.png";
import table from "../../assets/images/grid-lines.png";
const SideNavbar: React.FC = () => {
  return (
    <div className="SideNavbarStyles">
      <div className="home-icon">
        <img alt="" src={home} />
      </div>

      <div className="table-icon">
        <img alt="" src={table} />
      </div>
    </div>
  );
};
export default SideNavbar;
