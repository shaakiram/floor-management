import { tables } from "../data/tables";
import reducer, {
  addRoom,
  deleteRoom,
  setSelectedRoom,
  setSelectedTable,
  setOnlineState,
  setSelectedTableName,
  setSelectedMincovers,
  setSelectedMaxcovers,
  updateTableDetails,
  deleteSelectedTable,
  duplicateSelectedTable,
  rotateTable,
  RoomsState,
  setTablesToSelectedRoom,
  saveSelectedRoom,
  addTableLayout,
  removeTableLayout,
  setSelectedTableLayout,
  setOnlineStateTableLayout,
  setSelectedTableNameTableLayout,
  setSelectedMincoversTableLayout,
  setSelectedMaxcoversTableLayout,
} from "../features/floorSlice/floorSlice";
import { Room, Table } from "../types/types";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("unique-id"),
}));

describe("floorSlice reducer", () => {
  beforeEach(() => {
    // Mock local storage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const initialState: RoomsState = {
    rooms: [],
    selectedRoom: null,
    selectedTable: null,
    selectedTableLayout: null,
    tableLayout: tables,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  //room test cases
  it("should handle addRoom", () => {
    const newRoom: Room = { roomId: "1", roomName: "Room 1", tables: [] };
    const nextState = reducer(initialState, addRoom(newRoom));
    expect(nextState.rooms).toEqual([newRoom]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([newRoom])
    );
  });

  it("should handle deleteRoom", () => {
    const state: RoomsState = {
      rooms: [{ roomId: "1", roomName: "Room 1", tables: [] }],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, deleteRoom("1"));
    expect(nextState.rooms).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([])
    );
  });

  it("should handle setSelectedRoom", () => {
    const newRoom: Room = { roomId: "1", roomName: "Room 1", tables: [] };
    const nextState = reducer(initialState, setSelectedRoom(newRoom));
    expect(nextState.selectedRoom).toEqual(newRoom);
  });
  it("should handle setSaveSelectedRoom", () => {
    const state: RoomsState = {
      rooms: [
        {
          roomId: "1",
          roomName: "Room 1",
          tables: [
            {
              tableId: "1",
              tableName: "Table 1",
              onlineStatus: false,
              minCovers: 1,
              maxCovers: 4,
              rotation: 0,
              tableType: "ROUND",
            },
          ],
        },
      ],
      selectedRoom: {
        roomId: "1",
        roomName: "Room 1",
        tables: [
          {
            tableId: "1",
            tableName: "Table 1",
            onlineStatus: false,
            minCovers: 1,
            maxCovers: 4,
            rotation: 0,
            tableType: "ROUND",
          },
        ],
      },
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const updatedTables: Table[] = [
      {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      {
        tableId: "2",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
    ];
    const nextState = reducer(state, saveSelectedRoom(updatedTables));
    expect(nextState.selectedRoom?.tables).toEqual(updatedTables);
    expect(nextState.selectedTable).toEqual(null);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([])
    );
  });

  //table test cases

  it("should handle setSelectedTable", () => {
    const newTable: Table = {
      tableId: "1",
      tableName: "Table 1",
      onlineStatus: false,
      minCovers: 1,
      maxCovers: 4,
      rotation: 0,
      tableType: "ROUND",
    };
    const nextState = reducer(initialState, setSelectedTable(newTable));
    expect(nextState.selectedTable).toEqual(newTable);
  });
  it("should handle setTablesToSelectedRoom", () => {
    const newRoom: Room = { roomId: "1", roomName: "Room 1", tables: [] };
    const state: RoomsState = {
      rooms: [newRoom],
      selectedRoom: newRoom,
      selectedTable: null,
      selectedTableLayout: null,
      tableLayout: [],
    };
    const updatedTables: Table[] = [
      {
        tableId: "1",
        tableName: "Updated Table",
        onlineStatus: false,
        minCovers: 2,
        maxCovers: 5,
        rotation: 90,
        tableType: "ROUND",
      },
      {
        tableId: "2",
        tableName: "Table 2",
        onlineStatus: true,
        minCovers: 2,
        maxCovers: 6,
        rotation: 90,
        tableType: "SQUARE",
      },
    ];
    const nextState = reducer(state, setTablesToSelectedRoom(updatedTables));
    expect(nextState.selectedRoom?.tables).toEqual(updatedTables);
  });

  it("should handle setOnlineState", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, setOnlineState(true));
    expect(nextState.selectedTable?.onlineStatus).toEqual(true);
  });

  it("should handle setSelectedTableName", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, setSelectedTableName("New Table Name"));
    expect(nextState.selectedTable?.tableName).toEqual("New Table Name");
  });

  it("should handle setSelectedMincovers", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, setSelectedMincovers(2));
    expect(nextState.selectedTable?.minCovers).toEqual(2);
  });

  it("should handle setSelectedMaxcovers", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, setSelectedMaxcovers(5));
    expect(nextState.selectedTable?.maxCovers).toEqual(5);
  });

  it("should handle updateTableDetails", () => {
    const initialState: RoomsState = {
      rooms: [],
      selectedRoom: {
        roomId: "1",
        roomName: "Room 1",
        tables: [
          {
            tableId: "1",
            tableName: "Table 1",
            onlineStatus: false,
            minCovers: 1,
            maxCovers: 4,
            rotation: 0,
            tableType: "ROUND",
          },
          {
            tableId: "2",
            tableName: "Table 2",
            onlineStatus: true,
            minCovers: 2,
            maxCovers: 6,
            rotation: 90,
            tableType: "SQUARE",
          },
        ],
      },
      selectedTable: {
        tableId: "1",
        tableName: "Updated Table",
        onlineStatus: false,
        minCovers: 2,
        maxCovers: 5,
        rotation: 90,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };

    const updatedTables: Table[] = [
      {
        tableId: "1",
        tableName: "Updated Table",
        onlineStatus: false,
        minCovers: 2,
        maxCovers: 5,
        rotation: 90,
        tableType: "ROUND",
      },
      {
        tableId: "2",
        tableName: "Table 2",
        onlineStatus: true,
        minCovers: 2,
        maxCovers: 6,
        rotation: 90,
        tableType: "SQUARE",
      },
    ];

    const nextState = reducer(initialState, updateTableDetails());
    expect(nextState.selectedRoom?.tables).toEqual(updatedTables);
  });

  it("should handle deleteSelectedTable", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: {
        roomId: "1",
        roomName: "Room 1",
        tables: [
          {
            tableId: "1",
            tableName: "Table 1",
            onlineStatus: false,
            minCovers: 1,
            maxCovers: 4,
            rotation: 0,
            tableType: "ROUND",
          },
        ],
      },
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, deleteSelectedTable());
    expect(nextState.selectedRoom?.tables).toEqual([]);
    expect(nextState.selectedTable).toEqual(null);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([])
    );
  });

  it("should handle duplicateSelectedTable", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: {
        roomId: "1",
        roomName: "Room 1",
        tables: [
          {
            tableId: "1",
            tableName: "Table 1",
            onlineStatus: false,
            minCovers: 1,
            maxCovers: 4,
            rotation: 0,
            tableType: "ROUND",
          },
        ],
      },
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const nextState = reducer(state, duplicateSelectedTable());
    expect(nextState.selectedRoom?.tables.length).toEqual(2);
    expect(nextState.selectedRoom?.tables[1].tableId).toEqual(uuidv4());
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([])
    );
  });

  it("should handle rotateTable", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: {
        roomId: "1",
        roomName: "Room 1",
        tables: [
          {
            tableId: "1",
            tableName: "Table 1",
            onlineStatus: false,
            minCovers: 1,
            maxCovers: 4,
            rotation: 0,
            tableType: "ROUND",
          },
        ],
      },
      selectedTable: {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      selectedTableLayout: null,
      tableLayout: [],
    };
    const updatedTables: Table[] = [
      {
        tableId: "1",
        tableName: "Table 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
    ];
    const nextState = reducer(state, rotateTable(updatedTables));
    expect(nextState.selectedTable?.rotation).toEqual(90);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "rooms",
      JSON.stringify([])
    );
  });
  it("should handle addTableLayout", () => {
    const newTableLayout: Table = {
      tableId: "1",
      tableName: "Layout 1",
      onlineStatus: false,
      minCovers: 1,
      maxCovers: 4,
      rotation: 0,
      tableType: "ROUND",
    };
    const nextState = reducer(initialState, addTableLayout(newTableLayout));
    expect(nextState.tableLayout).toEqual([...tables, newTableLayout]);
  });

  it("should handle removeTableLayout", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: null,
      tableLayout: [
        {
          tableId: "1",
          tableName: "Layout 1",
          onlineStatus: false,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0,
          tableType: "ROUND",
        },
      ],
    };
    const nextState = reducer(state, removeTableLayout(0));
    expect(nextState.tableLayout).toEqual([]);
  });

  it("should handle setSelectedTableLayout", () => {
    const newTableLayout: Table = {
      tableId: "1",
      tableName: "Layout 1",
      onlineStatus: false,
      minCovers: 1,
      maxCovers: 4,
      rotation: 0,
      tableType: "ROUND",
    };
    const nextState = reducer(
      initialState,
      setSelectedTableLayout(newTableLayout)
    );
    expect(nextState.selectedTableLayout).toEqual(newTableLayout);
  });

  it("should handle setOnlineStateTableLayout", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: {
        tableId: "1",
        tableName: "Layout 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      tableLayout: [
        {
          tableId: "1",
          tableName: "Layout 1",
          onlineStatus: false,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0,
          tableType: "ROUND",
        },
      ],
    };
    const nextState = reducer(state, setOnlineStateTableLayout(true));
    expect(nextState.selectedTableLayout?.onlineStatus).toEqual(true);
    expect(nextState.tableLayout[0].onlineStatus).toEqual(true);
  });

  it("should handle setSelectedTableNameTableLayout", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: {
        tableId: "1",
        tableName: "Layout 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      tableLayout: [
        {
          tableId: "1",
          tableName: "Layout 1",
          onlineStatus: false,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0,
          tableType: "ROUND",
        },
      ],
    };
    const nextState = reducer(
      state,
      setSelectedTableNameTableLayout("New Layout Name")
    );
    expect(nextState.selectedTableLayout?.tableName).toEqual("New Layout Name");
    expect(nextState.tableLayout[0].tableName).toEqual("New Layout Name");
  });

  it("should handle setSelectedMincoversTableLayout", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: {
        tableId: "1",
        tableName: "Layout 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      tableLayout: [
        {
          tableId: "1",
          tableName: "Layout 1",
          onlineStatus: false,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0,
          tableType: "ROUND",
        },
      ],
    };
    const nextState = reducer(state, setSelectedMincoversTableLayout(2));
    expect(nextState.selectedTableLayout?.minCovers).toEqual(2);
    expect(nextState.tableLayout[0].minCovers).toEqual(2);
  });

  it("should handle setSelectedMaxcoversTableLayout", () => {
    const state: RoomsState = {
      rooms: [],
      selectedRoom: null,
      selectedTable: null,
      selectedTableLayout: {
        tableId: "1",
        tableName: "Layout 1",
        onlineStatus: false,
        minCovers: 1,
        maxCovers: 4,
        rotation: 0,
        tableType: "ROUND",
      },
      tableLayout: [
        {
          tableId: "1",
          tableName: "Layout 1",
          onlineStatus: false,
          minCovers: 1,
          maxCovers: 4,
          rotation: 0,
          tableType: "ROUND",
        },
      ],
    };
    const nextState = reducer(state, setSelectedMaxcoversTableLayout(5));
    expect(nextState.selectedTableLayout?.maxCovers).toEqual(5);
    expect(nextState.tableLayout[0].maxCovers).toEqual(5);
  });
});
