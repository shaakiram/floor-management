import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, Table } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
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
interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  selectedTable: Table | null;
}

const initialState: RoomsState = {
  rooms: loadRoomsFromLocalStorage(),
  selectedRoom: null,
  selectedTable: null,
};

const floorSlice = createSlice({
  name: "floorReducer",
  initialState,
  reducers: {
    //Room Reducers
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },
    setSelectedRoom(state, action: PayloadAction<Room | null>) {
      state.selectedRoom = action.payload;
    },
    setTablesToSelectedRoom(state, action: PayloadAction<Table[]>) {
      if (state.selectedRoom) {
        state.selectedRoom.tables = action.payload;
      }
    },
    saveSelectedRoom(state, action: PayloadAction<Table[]>) {
      if (state.selectedRoom) {
        state.selectedRoom.tables = action.payload;
        const updatedRooms = state.rooms.map((room) =>
          room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
        );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
        state.selectedTable = null;
      }
    },
    deleteRoom(state, action: PayloadAction<string>) {
      state.rooms = state.rooms.filter(
        (room) => room.roomId !== action.payload
      );
      if (state.selectedRoom && state.selectedRoom.roomId === action.payload) {
        state.selectedRoom = null;
        state.selectedTable = null;
      }
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },

    //Table reducers
    setSelectedTable(state, action: PayloadAction<Table | null>) {
      state.selectedTable = action.payload;
    },
    setOnlineState(state, action: PayloadAction<boolean>) {
      if (state.selectedTable) {
        state.selectedTable.onlineStatus = action.payload;
      }
    },
    setSelectedTableName(state, action: PayloadAction<string>) {
      if (state.selectedTable) {
        state.selectedTable.tableName = action.payload;
      }
    },
    setSelectedMincovers(state, action: PayloadAction<number>) {
      if (state.selectedTable) {
        state.selectedTable.minCovers = action.payload;
      }
    },
    setSelectedMaxcovers(state, action: PayloadAction<number>) {
      if (state.selectedTable) {
        state.selectedTable.maxCovers = action.payload;
      }
    },
    updateTableDetails(state, action: PayloadAction<Table[]>) {
      if (state.selectedTable && state.selectedRoom) {
        const updatedTables = action.payload.map((table) =>
          table.tableId === state.selectedTable?.tableId
            ? state.selectedTable
            : table
        );
        state.selectedRoom.tables = updatedTables;
      }
    },
    deleteSelectedTable(state) {
      if (state.selectedTable && state.selectedRoom) {
        state.selectedRoom.tables = state.selectedRoom.tables.filter(
          (table) => table.tableId !== state.selectedTable?.tableId
        );
        state.selectedTable = null;
        localStorage.setItem("rooms", JSON.stringify(state.rooms));
      }
    },
    duplicateSelectedTable(state) {
      if (state.selectedTable && state.selectedRoom) {
        const duplicatedTable = { ...state.selectedTable, tableId: uuidv4() };
        state.selectedRoom.tables.push(duplicatedTable);
        localStorage.setItem("rooms", JSON.stringify(state.rooms));
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
} = floorSlice.actions;
export default floorSlice.reducer;
