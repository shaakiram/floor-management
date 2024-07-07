import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, Table } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { tables } from "../../data/tables";
const loadRoomsFromLocalStorage = (): Room[] => {
  const storedRooms = localStorage.getItem("rooms");
  if (storedRooms) {
    try {
      const parsedRooms = JSON.parse(storedRooms);
      if (Array.isArray(parsedRooms)) {
        return parsedRooms;
      }
    } catch (error) {
      console.error("Error parsing rooms from localStorage:", error);
    }
  }
  return [];
};
export interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  selectedTable: Table | null;
  selectedTableLayout: Table | null;
  tableLayout: Table[];
}

const initialState: RoomsState = {
  rooms: loadRoomsFromLocalStorage(),
  selectedRoom: null,
  selectedTable: null,
  selectedTableLayout: null,
  tableLayout: tables,
};

const floorSlice = createSlice({
  name: "floorReducer",
  initialState,
  reducers: {
    //Room Reducers

    // setrooms to state rooms
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
    // adding rooms to state rooms and update local storage
    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },
    // set selected room
    setSelectedRoom(state, action: PayloadAction<Room | null>) {
      state.selectedRoom = action.payload;
    },
    //assign tables to the selectedroom object tables array
    setTablesToSelectedRoom(state, action: PayloadAction<Table[]>) {
      if (state.selectedRoom) {
        state.selectedRoom.tables = action.payload;
      }
    },
    //save selectedroom tables and update local storage
    saveSelectedRoom(state, action: PayloadAction<Table[]>) {
      if (state.selectedRoom) {
        state.selectedRoom.tables = action.payload;
        const roomsList = JSON.parse(localStorage.getItem("rooms") || "[]");
        const updatedRooms = roomsList.map((room: Room) =>
          room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        state.selectedTable = null;
        state.selectedTableLayout = null;
      }
    },

    //remove rooms from rooms state
    deleteRoom(state, action: PayloadAction<string>) {
      state.rooms = state.rooms.filter(
        (room) => room.roomId !== action.payload
      );
      if (state.selectedRoom && state.selectedRoom.roomId === action.payload) {
        state.selectedRoom = null;
        state.selectedTable = null;
        state.selectedTableLayout = null;
      }
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },

    //Table Layout reducers
    setSelectedTableLayout(state, action: PayloadAction<Table | null>) {
      state.selectedTableLayout = action.payload;
    },
    //add new table layout
    addTableLayout(state, action: PayloadAction<Table>) {
      state.tableLayout.push(action.payload);
    },
    //add new table layout
    removeTableLayout(state, action: PayloadAction<number>) {
      state.tableLayout.splice(action.payload, 1);
    },
    //update selected tables layout online status
    setOnlineStateTableLayout(state, action: PayloadAction<boolean>) {
      if (state.selectedTableLayout) {
        state.selectedTableLayout.onlineStatus = action.payload;
        const updatedTables = state.tableLayout.map((table) =>
          table.tableId === state.selectedTableLayout?.tableId
            ? state.selectedTableLayout
            : table
        );
        state.tableLayout = updatedTables;
      }
    },
    //update selected tables layout table name
    setSelectedTableNameTableLayout(state, action: PayloadAction<string>) {
      if (state.selectedTableLayout) {
        state.selectedTableLayout.tableName = action.payload;
        const updatedTables = state.tableLayout.map((table) =>
          table.tableId === state.selectedTableLayout?.tableId
            ? state.selectedTableLayout
            : table
        );
        state.tableLayout = updatedTables;
      }
    },
    //update selected tables lauoyt min covers
    setSelectedMincoversTableLayout(state, action: PayloadAction<number>) {
      if (state.selectedTableLayout) {
        state.selectedTableLayout.minCovers = action.payload;
        const updatedTables = state.tableLayout.map((table) =>
          table.tableId === state.selectedTableLayout?.tableId
            ? state.selectedTableLayout
            : table
        );
        state.tableLayout = updatedTables;
      }
    },
    //update selected tables layout max covers
    setSelectedMaxcoversTableLayout(state, action: PayloadAction<number>) {
      if (state.selectedTableLayout) {
        state.selectedTableLayout.maxCovers = action.payload;
        const updatedTables = state.tableLayout.map((table) =>
          table.tableId === state.selectedTableLayout?.tableId
            ? state.selectedTableLayout
            : table
        );
        state.tableLayout = updatedTables;
      }
    },

    //Table reducers
    //setting selected table to selected table state
    setSelectedTable(state, action: PayloadAction<Table | null>) {
      state.selectedTable = action.payload;
    },
    //update selected tables online status
    setOnlineState(state, action: PayloadAction<boolean>) {
      if (state.selectedTable) {
        state.selectedTable.onlineStatus = action.payload;
      }
    },
    //update selected tables table name
    setSelectedTableName(state, action: PayloadAction<string>) {
      if (state.selectedTable) {
        state.selectedTable.tableName = action.payload;
      }
    },
    //update selected tables min covers
    setSelectedMincovers(state, action: PayloadAction<number>) {
      if (state.selectedTable) {
        state.selectedTable.minCovers = action.payload;
      }
    },
    //update selected tables max covers
    setSelectedMaxcovers(state, action: PayloadAction<number>) {
      if (state.selectedTable) {
        state.selectedTable.maxCovers = action.payload;
      }
    },
    //update selected tables details to selected room state
    updateTableDetails(state) {
      if (state.selectedTable && state.selectedRoom) {
        const updatedTables = state.selectedRoom.tables.map((table) =>
          table.tableId === state.selectedTable?.tableId
            ? state.selectedTable
            : table
        );
        state.selectedRoom.tables = updatedTables;
      }
    },
    //delete table from room and update local storage
    deleteSelectedTable(state) {
      if (state.selectedTable && state.selectedRoom) {
        state.selectedRoom.tables = state.selectedRoom.tables.filter(
          (table) => table.tableId !== state.selectedTable?.tableId
        );
        state.selectedTable = null;
        state.selectedTableLayout = null;
        const roomsList = JSON.parse(localStorage.getItem("rooms") || "[]");
        const updatedRooms = roomsList.map((room: Room) =>
          room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      }
    },
    //duplicare the table and create new uuid for table id and adding to the room
    duplicateSelectedTable(state) {
      if (state.selectedTable && state.selectedRoom) {
        const duplicatedTable = { ...state.selectedTable, tableId: uuidv4() };
        state.selectedRoom.tables.push(duplicatedTable);
        const roomsList = JSON.parse(localStorage.getItem("rooms") || "[]");
        const updatedRooms = roomsList.map((room: Room) =>
          room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      }
    },
    //rotating the selected and update the state and local storage
    rotateTable(state, action: PayloadAction<Table[]>) {
      if (state.selectedTable && state.selectedRoom) {
        state.selectedTable.rotation =
          (state.selectedTable.rotation + 90) % 360;
        const updatedTables = action.payload.map((table) =>
          table.tableId === state.selectedTable?.tableId
            ? state.selectedTable
            : table
        );
        state.selectedRoom.tables = updatedTables;
        const roomsList = JSON.parse(localStorage.getItem("rooms") || "[]");
        const updatedRooms = roomsList.map((room: Room) =>
          room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      }
    },
  },
});

export const {
  setRooms,
  addRoom,
  setSelectedRoom,
  setTablesToSelectedRoom,
  saveSelectedRoom,
  setSelectedTable,
  setOnlineState,
  setSelectedTableName,
  setSelectedMaxcovers,
  setSelectedMincovers,
  updateTableDetails,
  deleteSelectedTable,
  duplicateSelectedTable,
  deleteRoom,
  rotateTable,
  setSelectedTableLayout,
  setOnlineStateTableLayout,
  setSelectedMaxcoversTableLayout,
  setSelectedMincoversTableLayout,
  setSelectedTableNameTableLayout,
  addTableLayout,
  removeTableLayout,
} = floorSlice.actions;
export default floorSlice.reducer;
