import React, { useState } from "react";
//libraries
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { makeStyles } from "@material-ui/styles";

//modal box styles
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
  outline: "none",
};
//modal header styles
const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    padding: "1rem",
    columnGap: "0.5rem",
  },
});

const DialogComponent: React.FC = () => {
  //states
  const [open, setOpen] = useState<boolean>(true);

  const classes = useStyles();

  //handle modal visibilty
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <div className={classes.header}>
          <WarningAmberRoundedIcon color="warning" />
          Table Limit Reached
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            gutterBottom
            fontSize="14px"
            paddingTop="10px"
            paddingBottom="10px"
          >
            You have reached the maximum number of tables. Please delete a table
            or create a new room.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            size="small"
            style={{ color: "#9d9d9d" }}
          >
            OK
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
export default DialogComponent;
