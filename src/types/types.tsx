export interface Table {
  tableId: string;
  tableName: string;
  minCovers: number;
  maxCovers: number;
  onlineStatus: boolean;
  tableType: "SQUARE" | "ROUND";
}
export interface Room {
  roomId: string;
  roomName: string;
  tables: Table[];
}
export interface TableCounts {
  tableCount: number;
  totalMinCovers: number;
  totalMaxCovers: number;
  onlineStatusCount: number;
}
