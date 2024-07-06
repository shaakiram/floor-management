import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "../../types/types";
import { tables } from "../../data/tables";

interface TableSelectionState {
  selectedTable: Table;
}

const initialState: TableSelectionState = {
  selectedTable: tables[0] || null,
};

const tableSelectionSlice = createSlice({
  name: "tableSelection",
  initialState,
  reducers: {
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
  },
});

export const {
  setSelectedTable,
  setOnlineState,
  setSelectedTableName,
  setSelectedMaxcovers,
  setSelectedMincovers,
} = tableSelectionSlice.actions;
export default tableSelectionSlice.reducer;
