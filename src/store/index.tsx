import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/tableSlice/tableSlice";
import roomsReducer from"../features/roomSlice/roomSlice"

const store = configureStore({
  reducer: {
    table: tableReducer,
    rooms: roomsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
