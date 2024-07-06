import React from "react";
import "./LeftComponentStyles.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import sqrTable from "../../assets/icons/Table.svg";
import rndTable from "../../assets/icons/Mid.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const LeftComponent: React.FC = () => {
  const tables = [
    {
      tableName: "",
      minCovers: 0,
      maxCovers: 0,
      onlineStatus: "INACTIVE",
      tableType: "SQUARE",
    },
    {
      tableName: "",
      minCovers: 0,
      maxCovers: 0,
      onlineStatus: "INACTIVE",
      tableType: "ROUND",
    },
  ];
  return (
    <div className="LeftComponentStyles">
      <div className="header">Floor Managment</div>
      <div className="main-component">
        <div className="table-component">
          <div className="tables-header">
            <div className="header-container">Tables</div>
          </div>
          <div className="table-container">
            <div className="opt-header">Table Options</div>
            <div className="opt-sub-header">Drag and drop you tables</div>
            <div className="tables">
              {tables.map((table, index) => {
                return (
                  <img
                    alt=""
                    src={table.tableType === "SQUARE" ? sqrTable : rndTable}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="room-component">
          <div className="room-header">
            <div className="header-container">
              <div className="header-room">Main Room</div>
            </div>
            <div className="button-container">
              <Stack direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddIcon />}
                  disableElevation={true}
                  className="button-add"
                >
                  Add Room
                </Button>
                <Button size="small" variant="outlined" className="button-save">
                  Save Room
                </Button>
                <MoreVertIcon color="disabled" />
              </Stack>
            </div>
          </div>
          <div className="room-area">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftComponent;
