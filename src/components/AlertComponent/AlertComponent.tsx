import React, { useEffect } from "react";
//libraries
import Alert from "@mui/material/Alert";

interface AlertComponentProps {
  alertText: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const AlertComponent: React.FC<AlertComponentProps> = ({
  alertText,
  setClose,
}) => {
  useEffect(() => {
    //close the alert after 2s
    setTimeout(() => {
      setClose(false);
    }, 2000);
  }, [setClose]);
  return (
    <div style={{ position: "absolute", right: "2rem", top: "2rem" }}>
      <Alert severity="success">{alertText}</Alert>
    </div>
  );
};
export default AlertComponent;
