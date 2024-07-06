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
  selectedRoom: Room | null; // Define selectedRoom as Room or null
}

const initialState: RoomsState = {
  rooms: loadRoomsFromLocalStorage(),
  selectedRoom: null,
};

const roomsSlice = createSlice({
  name: "rooms",
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
        const updatedRooms = state.rooms.map(room =>
            room.roomId === state.selectedRoom?.roomId ? state.selectedRoom : room
          );
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      }
    },
  },
});

export const { setRooms, addRoom, setSelectedRoom ,setTablesToSelectedRoom} = roomsSlice.actions;
export default roomsSlice.reducer;
