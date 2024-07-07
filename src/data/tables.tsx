import { Table } from "../types/types";
import { v4 as uuidv4 } from "uuid";
//defult tables lis in to drag and drop
export const tables: Table[] = [
  {
    tableId: uuidv4(),
    tableName: "Table New",
    minCovers: 0,
    maxCovers: 0,
    onlineStatus: false,
    tableType: "SQUARE",
    rotation: 0,
  },
  {
    tableId: uuidv4(),
    tableName: "Table New",
    minCovers: 0,
    maxCovers: 0,
    onlineStatus: false,
    tableType: "ROUND",
    rotation: 0,
  },
];
