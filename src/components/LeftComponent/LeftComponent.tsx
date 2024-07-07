import React, { useState } from "react";
//components
import TableDetailsComponent from "./TableDetailsComponent/TableDetailsCompoent";
import ActionContainerComponent from "../ActionContainer/ActionContainerComponent";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AlertComponent from "../AlertComponent/AlertComponent";
import DialogComponent from "../DialogComponent/DialogComponent";
import PrimaryButton from "../Button/PrimaryButton";
//libraries
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import sqrTable from "../../assets/icons/Table.svg";
import rndTable from "../../assets/icons/Mid.svg";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

//table intial data
import { tables } from "../../data/tables";
//types
import { Table } from "../../types/types";
//store
import { RootState } from "../../store";
//reducer
import {
  setSelectedTable,
  setTablesToSelectedRoom,
  saveSelectedRoom,
  deleteRoom,
  setSelectedRoom,
} from "../../features/floorSlice/floorSlice";

//scss
import "./LeftComponentStyles.scss";
interface LeftComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigateFrom: React.Dispatch<React.SetStateAction<string>>;
}

const LeftComponent: React.FC<LeftComponentProps> = ({
  setIsModalVisible,
  setNavigateFrom,
}) => {
  //state to hanlde modal visibility
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);
  //state to handle alert visibility
  const [roomSaveSuccess, setRoomSaveSuccess] = useState<boolean>(false);
  const [tableSaveSuccess, setTableSaveSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();
  const selectedTable = useSelector(
    (state: RootState) => state.floor.selectedTable
  );
  const selectedRoom = useSelector(
    (state: RootState) => state.floor.selectedRoom
  );

  //drage endfunction from dnd
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    //check if there is a dropping destination
    if (!destination) {
      return;
    }
    //check if dragging tables from rooms and dropping table container
    if (
      source.droppableId === "RoomTables" &&
      destination.droppableId === "NewTable"
    ) {
      return;
    }
    //check  dragging and dropping place is same
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
      rotation: 0,
    };
    if (
      destination.droppableId === "RoomTables" &&
      source.droppableId === "NewTable"
    ) {
      if (selectedRoomTables.length < 15) {
        const add = selectionTables[source.index];
        //remove table from drag table container
        tables.splice(source.index, 1);
        //adding table to the room
        selectedRoomTables.splice(destination.index, 0, add);
        //creating new table to table container
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
          <div className="header-cont">
            <div className="header2">
              <div
                onClick={() => {
                  if (selectedRoom) {
                    dispatch(setSelectedRoom(null));
                  }
                }}
              >
                <ArrowBackIosNewRoundedIcon />
              </div>
            </div>
            <div className="header">Floor Managment</div>
            <div className="header2" />
          </div>

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
                  <TableDetailsComponent
                    setTableSaveSuccess={setTableSaveSuccess}
                  />
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
                      onClick={() => {
                        setNavigateFrom("TABLE");
                        setIsModalVisible(true);
                      }}
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
                          setRoomSaveSuccess(true);
                        }
                      }}
                    >
                      Save Room
                    </Button>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (selectedRoom) {
                          dispatch(deleteRoom(selectedRoom.roomId));
                        }
                      }}
                    >
                      <DeleteOutlineRoundedIcon color="disabled" />
                    </div>
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
                              <div style={{ position: "relative" }}>
                                {selectedTable?.tableId === table.tableId && (
                                  <ActionContainerComponent
                                    setExceedLimit={setExceedLimit}
                                  />
                                )}

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
                                  style={{
                                    transform: `rotate(${table?.rotation}deg)`,
                                  }}
                                />
                              </div>
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
      {tableSaveSuccess && (
        <AlertComponent
          alertText={`Successfully ${selectedTable?.tableName} Table Saved !`}
          setClose={setTableSaveSuccess}
        />
      )}
      {roomSaveSuccess && (
        <AlertComponent
          alertText={`Successfully ${selectedRoom?.roomName} Room Saved !`}
          setClose={setRoomSaveSuccess}
        />
      )}
    </React.Fragment>
  );
};
export default LeftComponent;
