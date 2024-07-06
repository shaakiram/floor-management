import React from "react";
import "./FloatingComponentStyles.scss";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const FloatingComponent: React.FC = () => {
  return (
    <div className="FloatingComponentStyles">
      <div className="grid">
        <TableBarOutlinedIcon fontSize="small" />
        67 Tables
      </div>
      <div className="grid"><PeopleAltOutlinedIcon  fontSize="small" />67 Min Covers</div>
      <div className="grid"><PeopleAltOutlinedIcon  fontSize="small" />67 Min Covers</div>
      <div className="grid"><LanguageOutlinedIcon fontSize="small" />67 Online Capacity</div>
    </div>
  );
};
export default FloatingComponent;
