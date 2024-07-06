import React, { useState } from "react";
import "./LeftComponentStyles.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import sqrTable from "../../assets/icons/Table.svg";
import rndTable from "../../assets/icons/Mid.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import NumberInput from "../NumberInput/NumberInput";
import SwitchComponent from "../SwitchComponent/SwitchComponent";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const useStyles = makeStyles({
  root: {
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
      "& fieldset": {
        borderWidth: "1px", // Change border width
      },
    },
    // change font size
    "& .MuiInputBase-input": {
      fontSize: "0.7rem", // Change font size for standard and filled variants
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "0.7rem", // Change font size for outlined variant
    },
  },
});
interface Item {
  tableId: Number;
  tableName: string;
  minCovers: Number;
  maxCovers: Number;
  onlineStatus: string;
  tableType: string;
}
const tables = [
  {
    tableId: 1,
    tableName: "",
    minCovers: 0,
    maxCovers: 0,
    onlineStatus: "INACTIVE",
    tableType: "SQUARE",
  },
  {
    tableId: 2,
    tableName: "",
    minCovers: 0,
    maxCovers: 0,
    onlineStatus: "INACTIVE",
    tableType: "ROUND",
  },
];
const LeftComponent: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<Item>(tables[0]);
  const [loading, setLoading] = useState<boolean>(false);

  const classes = useStyles();
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
                    className={
                      selectedTable.tableId === table.tableId ? "selected" : ""
                    }
                    onClick={() => {
                      setSelectedTable(table);
                    }}
                  />
                );
              })}
            </div>
            <div className="table-details">
              <div className="opt-header">Table Details</div>
              <div className="form-container">
                <div className="input-container">
                  <div className="label">Table Name</div>
                  <div className="input">
                    <TextField className={classes.root} size="small" />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Min Covers</div>
                  <div className="input">
                    <NumberInput />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Max Covers</div>
                  <div className="input">
                    <NumberInput />
                  </div>
                </div>
                <div className="input-container">
                  <div className="label">Online</div>
                  <div className="input">
                    <SwitchComponent />
                  </div>
                </div>
              </div>
            </div>
            <div className="advanced-details">
              <div className="input-container">
                <div className="label">Advanced Settings</div>
                <div className="input">
                  {loading ? (
                    <ExpandLessIcon className="icon" onClick={()=>{
                        setLoading(!loading)
                    }} />
                  ) : (
                    <KeyboardArrowDownIcon className="icon" onClick={()=>{
                        setLoading(!loading)
                    }}/>
                  )}
                </div>
              </div>
              {loading && (
                <div className="skeleton">
                  <Skeleton
                    variant="rectangular"
                    width={210}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={210}
                    height={58}
                    animation="wave"
                  />
                </div>
              )}
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
