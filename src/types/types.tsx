//Table type
export interface Table {
  tableId: string;
  tableName: string;
  minCovers: number;
  maxCovers: number;
  onlineStatus: boolean;
  tableType: "SQUARE" | "ROUND";
  rotation: number;
}
//Room type
export interface Room {
  roomId: string;
  roomName: string;
  tables: Table[];
}
//Table count type
export interface TableCounts {
  tableCount: number;
  totalMinCovers: number;
  totalMaxCovers: number;
  onlineStatusCount: number;
}
