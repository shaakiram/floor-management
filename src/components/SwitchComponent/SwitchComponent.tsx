// Customized switch component for online status
import * as React from "react";
//libraries
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
//store
import { RootState } from "../../store";
//reducer
import {
  setOnlineState,
  setOnlineStateTableLayout,
} from "../../features/floorSlice/floorSlice";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  cursor: "pointer",
  width: 40,
  height: 23,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#e60000",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "white",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 19,
    height: 19,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#d8d8d8",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const useStyles = makeStyles({
  labelActive: {
    color: "#e60000",
  },
  labelInactive: {
    color: "#9d9d9d",
  },
});

const SwitchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTable = useSelector(
    (state: RootState) => state.floor.selectedTable
  );
  const selectedTableLayout = useSelector(
    (state: RootState) => state.floor.selectedTableLayout
  );
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          defaultChecked={false}
          onChange={() => {
            if (selectedTableLayout) {
              dispatch(
                setOnlineStateTableLayout(!selectedTableLayout.onlineStatus)
              );
            }
            if (selectedTable) {
              dispatch(setOnlineState(!selectedTable?.onlineStatus));
            }
          }}
          checked={
            selectedTableLayout
              ? selectedTableLayout.onlineStatus
              : selectedTable?.onlineStatus
          }
        />
      }
      label={
        selectedTableLayout
          ? selectedTableLayout?.onlineStatus
            ? "Active"
            : "Inactive"
          : selectedTable?.onlineStatus
          ? "Active"
          : "Inactive"
      }
      labelPlacement="start"
      className={
        selectedTableLayout
          ? selectedTableLayout?.onlineStatus
            ? classes.labelActive
            : classes.labelInactive
          : selectedTable?.onlineStatus
          ? classes.labelActive
          : classes.labelInactive
      }
    />
  );
};
export default SwitchComponent;
