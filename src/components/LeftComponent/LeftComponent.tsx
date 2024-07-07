import React, { useState } from "react";
import "./LeftComponentStyles.scss";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import sqrTable from "../../assets/icons/Table.svg";
import rndTable from "../../assets/icons/Mid.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";


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
  setSelectedTable,
  setTablesToSelectedRoom,
  saveSelectedRoom,
} from "../../features/floorSlice/floorSlice";
import TableDetailsComponent from "./TableDetailsComponent/TableDetailsCompoent";

interface LeftComponentProps {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftComponent: React.FC<LeftComponentProps> = ({ setIsModalVisible }) => {
  const [exceedLimit, setExceedLimit] = useState<boolean>(false);


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
                {selectedTable && <TableDetailsComponent />}
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
