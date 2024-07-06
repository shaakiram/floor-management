import * as React from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setOnlineState } from "../../features/tableSlice/tableSlice";
import { makeStyles } from "@material-ui/styles";
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
    (state: RootState) => state.table.selectedTable
  );
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <IOSSwitch
          sx={{ m: 1 }}
          defaultChecked={false}
          onChange={() => {
            dispatch(setOnlineState(!selectedTable.onlineStatus));
          }}
          checked={selectedTable.onlineStatus}
        />
      }
      label={selectedTable.onlineStatus ? "Active" : "Inactive"}
      labelPlacement="start"
      className={
        selectedTable.onlineStatus ? classes.labelActive : classes.labelInactive
      }
    />
  );
};
export default SwitchComponent;
