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
