import React from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(45deg, #930909 30%, #b50707 90%)",
    borderRadius: "3px",
    border: "none",
    color: "#fff",
    padding: "0 10px",
    outline: "none",
  },
});
interface PrimaryButtonProps {
  onClick: () => void;
  icon: boolean;
  buttonText: string;
}
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  icon,
  buttonText,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      onClick={onClick}
      size="small"
      className={classes.button}
      style={{ color: "white", textTransform: "capitalize", border: "none" }}
      startIcon={icon ? <AddIcon /> : ""}
      disableElevation={true}
    >
      {buttonText}
    </Button>
  );
};
export default PrimaryButton;
