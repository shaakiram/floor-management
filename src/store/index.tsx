import { configureStore } from "@reduxjs/toolkit";
import floorReducer from"../features/floorSlice/floorSlice"

const store = configureStore({
  reducer: {
    floor: floorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
