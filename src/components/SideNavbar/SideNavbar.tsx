import React from "react";
import "./SideNavbarStyles.scss";
import home from "../../assets/images/home.png";
import table from "../../assets/images/grid-lines.png";
import { useNavigate, useLocation } from "react-router-dom";

const SideNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleRoomsClick = () => {
    navigate("/");
  };
  return (
    <div className="SideNavbarStyles">
      <div className="home-icon" onClick={handleHomeClick}>
        <img
          alt=""
          src={home}
          className={location.pathname === "/home" ? "bg" : ""}
        />
      </div>

      <div className="table-icon" onClick={handleRoomsClick}>
        <img alt="" src={table}           className={location.pathname === "/" ? "bg" : ""}/>
      </div>
    </div>
  );
};
export default SideNavbar;
