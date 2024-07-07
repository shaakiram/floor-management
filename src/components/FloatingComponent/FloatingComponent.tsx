import React from "react";
import "./FloatingComponentStyles.scss";
import TableBarOutlinedIcon from "@mui/icons-material/TableBarOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Room, TableCounts } from "../../types/types";

const FloatingComponent: React.FC = () => {
  const selectedRoom = useSelector(
    (state: RootState) => state.floor.selectedRoom
  );
  const countTableDetails = (room: Room): TableCounts => {
    return room.tables.reduce(
      (acc, table) => {
        acc.tableCount = room.tables.length;
        acc.totalMinCovers += table.minCovers;
        acc.totalMaxCovers += table.maxCovers;
        if (table.onlineStatus) {
          acc.onlineStatusCount += 1;
        }
        return acc;
      },
      {
        totalMinCovers: 0,
        totalMaxCovers: 0,
        onlineStatusCount: 0,
        tableCount: 0,
      }
    );
  };
  return (
    <div className="FloatingComponentStyles">
      <div className="grid">
        <TableBarOutlinedIcon fontSize="small" />
        {selectedRoom && countTableDetails(selectedRoom).tableCount} Tables
      </div>
      <div className="grid">
        <PeopleAltOutlinedIcon fontSize="small" />
        {selectedRoom && countTableDetails(selectedRoom).totalMinCovers} Min
        Covers
      </div>
      <div className="grid">
        <PeopleAltOutlinedIcon fontSize="small" />
        {selectedRoom && countTableDetails(selectedRoom).totalMaxCovers} Max
        Covers
      </div>
      <div className="grid">
        <LanguageOutlinedIcon fontSize="small" />
        {selectedRoom &&
          countTableDetails(selectedRoom).onlineStatusCount} /
        {selectedRoom && countTableDetails(selectedRoom).tableCount} Online
        Capacity
      </div>
    </div>
  );
};
export default FloatingComponent;
