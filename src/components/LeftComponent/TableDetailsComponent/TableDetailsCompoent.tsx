import React, { useState } from "react";
//libraries
import TextField from "@mui/material/TextField";
import NumberInput from "../../NumberInput/NumberInput";
import SwitchComponent from "../../SwitchComponent/SwitchComponent";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
//store
import { RootState } from "../../../store";
//reducer
import {
  setSelectedMaxcovers,
  setSelectedMaxcoversTableLayout,
  setSelectedMincovers,
  setSelectedMincoversTableLayout,
  setSelectedTableName,
  setSelectedTableNameTableLayout,
  updateTableDetails,
} from "../../../features/floorSlice/floorSlice";
//input field styles
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
interface TableDetailsComponentProps {
  setTableSaveSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}
const TableDetailsComponent: React.FC<TableDetailsComponentProps> = ({
  setTableSaveSuccess,
}) => {
  //states
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedTable = useSelector(
    (state: RootState) => state.floor.selectedTable
  );
  const selectedTableLayout = useSelector(
    (state: RootState) => state.floor.selectedTableLayout
  );
  return (
    <React.Fragment>
      <div className="table-details">
        <div className="opt-header">Table Details</div>
        <div className="form-container">
          <div className="input-container">
            <div className="label">Table Name</div>
            <div className="input">
              <TextField
                className={classes.root}
                size="small"
                value={
                  selectedTableLayout
                    ? selectedTableLayout.tableName
                    : selectedTable?.tableName
                }
                onChange={(e) => {
                  if (selectedTable) {
                    dispatch(setSelectedTableName(e.target.value));
                  }
                  if (selectedTableLayout) {
                    dispatch(setSelectedTableNameTableLayout(e.target.value));
                  }
                }}
              />
            </div>
          </div>

          <div className="input-container">
            <div className="label">Min Covers</div>
            <div className="input">
              <NumberInput
                value={
                  selectedTableLayout
                    ? selectedTableLayout.minCovers
                    : selectedTable?.minCovers
                }
                onChange={(e, val) => {
                  if (selectedTable) {
                    dispatch(setSelectedMincovers(val || 0));
                  }
                  if (selectedTableLayout) {
                    dispatch(setSelectedMincoversTableLayout(val || 0));
                  }
                }}
              />
            </div>
          </div>
          <div className="input-container">
            <div className="label">Max Covers</div>
            <div className="input">
              <NumberInput
                value={
                  selectedTableLayout
                    ? selectedTableLayout.maxCovers
                    : selectedTable?.maxCovers
                }
                onChange={(e, val) => {
                  if (selectedTable) {
                    dispatch(setSelectedMaxcovers(val || 0));
                  }
                  if (selectedTableLayout) {
                    dispatch(setSelectedMaxcoversTableLayout(val || 0));
                  }
                }}
              />
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
              <ExpandLessIcon
                className="icon"
                onClick={() => {
                  setLoading(!loading);
                }}
              />
            ) : (
              <KeyboardArrowDownIcon
                className="icon"
                onClick={() => {
                  setLoading(!loading);
                }}
              />
            )}
          </div>
        </div>
        {loading && (
          <div className="skeleton">
            <Skeleton variant="rectangular" width={210} animation="wave" />
          </div>
        )}
      </div>
      {selectedTable && (
        <div className="btn-cont">
          <Button
            size="small"
            variant="outlined"
            className="button-save"
            onClick={() => {
              if (selectedTable) {
                dispatch(updateTableDetails());
                setTableSaveSuccess(true);
              }
            }}
          >
            Save Table
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
export default TableDetailsComponent;
