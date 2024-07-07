import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room, Table } from "../../types/types";
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
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },
    setSelectedRoom(state, action: PayloadAction<Room>) {
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
      }
    },
    //Table reducers
    setSelectedTable(state, action: PayloadAction<Table>) {
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
      if (state.selectedTable  && state.selectedRoom) {
        const updatedTables = action.payload.map((table) =>
          table.tableId === state.selectedTable?.tableId
            ? state.selectedTable
            : table
        );
        state.selectedRoom.tables = updatedTables
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
} = floorSlice.actions;
export default floorSlice.reducer;
