import React from "react";
//libraries
import { Box, Modal, Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
//types
import { Room } from "../../types/types";
//reducer
import { addRoom, setSelectedRoom } from "../../features/floorSlice/floorSlice";

//modal box style
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
const useStyles = makeStyles({
    //modal header
  header: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    padding: "1rem",
    columnGap: "0.5rem",
  },
  root: {
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
      "& fieldset": {
        borderWidth: "0.5px", // Change border width
      },
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "0.7rem", // Change font size for outlined variant
    },
  },
  //modal lable
  lable: {
    fontSize: "0.8rem",
    fontWeight: 300,
    color: "#7f7f7f",
    paddingTop: "1.5rem",
    marginBottom: "1rem",
    borderTop: "1px solid #eaeaea",
  },
  //error text
  error: {
    fontSize: "0.7rem",
    color: "#e60000",
    marginTop: "0.5rem",
  },
  //button style
  button: {
    borderRadius: "3px",
    border: "1px solid red",
    color: "#fff",
    padding: "20 10px",
    outline: "none",
    textTransform: "capitalize",
    height: 36,
  },
});
interface RoomFormValues {
  roomName: string;
}
interface AddRoomDialogComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  navigateFrom: string;
}
const AddRoomDialogComponent: React.FC<AddRoomDialogComponentProps> = ({
  setIsModalVisible,
  isModalVisible,
  navigateFrom,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
//hanle modal visibilty
  const handleClose = () => {
    setIsModalVisible(false);
  };
  const initialValues: RoomFormValues = {
    roomName: "",
  };
  //hanld the form and submit
  const handleSubmit = (values: RoomFormValues) => {
    let room: Room = {
      roomName: values.roomName,
      roomId: uuidv4(),
      tables: [],
    };
    dispatch(addRoom(room));
    if (navigateFrom === "TABLE") {
      dispatch(setSelectedRoom(room));
    }
    handleClose();
  };
  const validateForm = (values: RoomFormValues) => {
    const errors: Partial<RoomFormValues> = {};
    if (!values.roomName) {
      errors.roomName = "*Room name is required";
    }
    return errors;
  };
  return (
    <Modal open={isModalVisible}>
      <Box sx={style}>
        <div className={classes.header}>
          <MeetingRoomIcon color="error" />
          Create Room
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          <Form className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.lable}>Room Name</div>

                <Field as={TextField} name="roomName" fullWidth />
                <ErrorMessage
                  name="roomName"
                  component="div"
                  className={classes.error}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                p: 1,
                m: 1,
              }}
            >
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                style={{
                  color: "white",
                  textTransform: "capitalize",
                  border: "none",
                  backgroundColor: "black",
                }}
                disableElevation={true}
              >
                Create Room
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};
export default AddRoomDialogComponent;
