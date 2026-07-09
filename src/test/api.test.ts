import { getAllBoards, createBoard, saveBoard, patchBoard } from "../service/api";
import { supabase } from "../service/supabase";

jest.mock("../service/supabase", () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe("Supabase API Service", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("getAllBoards", () => {
    test("should fetch boards successfully when they exist", async () => {
      const mockBoards = [{ id: "1", title: "Board 1", columns: [], tasks: [] }];
      
      const mockFrom = supabase.from as jest.Mock;
      const mockSelect = jest.fn().mockResolvedValue({ data: mockBoards, error: null });
      mockFrom.mockReturnValue({ select: mockSelect });

      const result = await getAllBoards();
      expect(result).toEqual(mockBoards);
    });

    test("should seed initial boards and return them if table is empty", async () => {
      const mockFrom = supabase.from as jest.Mock;
      
      // First call returns empty data
      const mockSelect = jest.fn().mockResolvedValue({ data: [], error: null });
      // Insert mock
      const mockInsert = jest.fn().mockResolvedValue({ error: null });

      mockFrom.mockImplementation((table: string) => {
        if (table === 'boards') {
          return {
            select: mockSelect,
            insert: mockInsert
          };
        }
        return {};
      });

      const result = await getAllBoards();
      expect(mockInsert).toHaveBeenCalled();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("createBoard", () => {
    test("should insert a new board and return it", async () => {
      const newBoardTitle = "New Board";
      const mockFrom = supabase.from as jest.Mock;
      
      const mockSelect = jest.fn().mockResolvedValue({
        data: [{ id: "new-id", title: newBoardTitle, columns: [], tasks: [] }],
        error: null
      });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

      mockFrom.mockReturnValue({ insert: mockInsert });

      const result = await createBoard({ title: newBoardTitle });
      expect(result.title).toBe(newBoardTitle);
    });
  });

  describe("saveBoard", () => {
    test("should update board and return updated value", async () => {
      const boardToUpdate = { id: "1", title: "Updated Board", columns: [], tasks: [] };
      const mockFrom = supabase.from as jest.Mock;

      const mockSelect = jest.fn().mockResolvedValue({
        data: [boardToUpdate],
        error: null
      });
      const mockEq = jest.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

      mockFrom.mockReturnValue({ update: mockUpdate });

      const result = await saveBoard(boardToUpdate);
      expect(result).toEqual(boardToUpdate);
    });
  });

  describe("patchBoard", () => {
    test("should update tasks of a specific board", async () => {
      const tasks = [{ id: "t1", title: "Task 1", description: "", subtasks: [], columnId: "c1" }];
      const mockFrom = supabase.from as jest.Mock;

      const mockSelect = jest.fn().mockResolvedValue({
        data: [{ id: "1", tasks }],
        error: null
      });
      const mockEq = jest.fn().mockReturnValue({ select: mockSelect });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

      mockFrom.mockReturnValue({ update: mockUpdate });

      const result = await patchBoard(tasks, "1");
      expect(result?.tasks).toEqual(tasks);
    });
  });
});
