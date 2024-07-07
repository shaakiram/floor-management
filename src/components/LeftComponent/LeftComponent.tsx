import React, { useState } from "react";
import "./LeftComponentStyles.scss";
import Button from "@mui/material/Button";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { tables } from "../../data/tables";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Table } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import DialogComponent from "../DialogComponent/DialogComponent";
import PrimaryButton from "../Button/PrimaryButton";
import {
  setSelectedMaxcovers,
  setSelectedMincovers,
  setSelectedTable,
  setSelectedTableName,
  setTablesToSelectedRoom,
  saveSelectedRoom,
  updateTableDetails,
} from "../../features/floorSlice/floorSlice";
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
interface LeftComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftComponent: React.FC<LeftComponentProps> = ({ setIsModalVisible }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);

  const classes = useStyles();

  const dispatch = useDispatch();
  const selectedTable = useSelector(
    (state: RootState) => state.floor.selectedTable
  );
  const selectedRoom = useSelector(
    (state: RootState) => state.floor.selectedRoom
  );
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === "RoomTables" &&
      destination.droppableId === "NewTable"
    ) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const selectedRoomTables = selectedRoom?.tables
      ? [...selectedRoom.tables]
      : [];
    const selectionTables = [...tables];
    let newT: Table = {
      tableId: uuidv4(),
      tableName: "Table New",
      minCovers: 0,
      maxCovers: 0,
      onlineStatus: false,
      tableType: "SQUARE",
    };
    if (
      destination.droppableId === "RoomTables" &&
      source.droppableId === "NewTable"
    ) {
      if (selectedRoomTables.length < 15) {
        const add = selectionTables[source.index];
        tables.splice(source.index, 1);
        selectedRoomTables.splice(destination.index, 0, add);
        newT.tableType = add.tableType;
        dispatch(setSelectedTable(add));
        tables.push(newT);
      } else {
        setExceedLimit(true);
      }
    }

    dispatch(setTablesToSelectedRoom(selectedRoomTables));
  };
  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
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
                <Droppable droppableId="NewTable">
                  {(provided) => (
                    <div
                      className="tables"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tables.map((table, index) => {
                        return (
                          <Draggable draggableId={table.tableId} index={index}>
                            {(provided) => (
                              <img
                                alt=""
                                src={
                                  table.tableType === "SQUARE"
                                    ? sqrTable
                                    : rndTable
                                }
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              />
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                {selectedTable && (
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
                              value={selectedTable.tableName}
                              onChange={(e) => {
                                dispatch(setSelectedTableName(e.target.value));
                              }}
                            />
                          </div>
                        </div>

                        <div className="input-container">
                          <div className="label">Min Covers</div>
                          <div className="input">
                            <NumberInput
                              value={selectedTable.minCovers}
                              onChange={(e, val) => {
                                dispatch(setSelectedMincovers(val || 0));
                              }}
                            />
                          </div>
                        </div>
                        <div className="input-container">
                          <div className="label">Max Covers</div>
                          <div className="input">
                            <NumberInput
                              value={selectedTable.maxCovers}
                              onChange={(e, val) => {
                                dispatch(setSelectedMaxcovers(val || 0));
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
                          <Skeleton
                            variant="rectangular"
                            width={210}
                            animation="wave"
                          />
                        </div>
                      )}
                    </div>
                    <div className="btn-cont">
                      <Button
                        size="small"
                        variant="outlined"
                        className="button-save"
                        onClick={() => {
                          if (selectedRoom) {
                            dispatch(updateTableDetails(selectedRoom.tables));
                          }
                        }}
                      >
                        Save Table
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="room-component">
              <div className="room-header">
                <div className="header-container">
                  <div className="header-room">{selectedRoom?.roomName}</div>
                </div>
                <div className="button-container">
                  <Stack direction="row" spacing={2}>
                    <PrimaryButton
                      onClick={() => setIsModalVisible(true)}
                      icon
                      buttonText="Add Room"
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      className="button-save"
                      onClick={() => {
                        if (selectedRoom) {
                          dispatch(saveSelectedRoom(selectedRoom.tables));
                        }
                      }}
                    >
                      Save Room
                    </Button>
                    <MoreVertIcon color="disabled" />
                  </Stack>
                </div>
              </div>
              <Droppable droppableId="RoomTables">
                {(provided) => (
                  <div
                    className="room-area"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {selectedRoom?.tables?.map(
                      (table: Table, index: number) => {
                        return (
                          <Draggable draggableId={table.tableId} index={index}>
                            {(provided) => (
                              <img
                                alt=""
                                src={
                                  table.tableType === "SQUARE"
                                    ? sqrTable
                                    : rndTable
                                }
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                className={
                                  selectedTable?.tableId === table.tableId
                                    ? "selected"
                                    : ""
                                }
                                onClick={() => {
                                  dispatch(setSelectedTable(table));
                                }}
                              />
                            )}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
      {exceedLimit && <DialogComponent />}
    </React.Fragment>
  );
};
export default LeftComponent;
