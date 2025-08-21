import { apiFetch, OptionsRequest } from "../service/api";

let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  global.fetch = jest.fn() as jest.Mock<any, any>;
  (process.env as NodeJS.ProcessEnv).REACT_APP_HOST = "http://localhost:3333";
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  delete (process.env as NodeJS.ProcessEnv).REACT_APP_HOST;
});

describe("apiFetch", () => {
  test("should return data in JSON on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: "Sucess!" }),
    } as Response);

    const endpoint: string = "/boards";
    const options: OptionsRequest = { method: "GET" };
    const result = await apiFetch(endpoint, options);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3333/boards",
      expect.objectContaining({
        method: "GET",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(result).toEqual({ data: "Sucess!" });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  test("should throw an error with the API message on HTTP failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: "not found" }),
    } as Response);

    const endpoint: string = "/not-found";
    const options: OptionsRequest = { method: "GET" };

    await expect(apiFetch(endpoint, options)).rejects.toThrow(
      "not found"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "API request failed:",
      expect.any(Error)
    );
  });

  test("should throw an error without message JSON on HTTP failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error("error reading JSON")),
    } as Response);

    const endpoint: string = "/error-server";
    const options: OptionsRequest = { method: "POST" };

    await expect(apiFetch(endpoint, options)).rejects.toThrow(
      "HTTP error! status: 500"
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "API request failed:",
      expect.any(Error)
    );
  });

  test("should rethrow the original error in case of network failure", async () => {
    const networkError: TypeError = new TypeError("Failed to fetch");
    (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

    const endpoint: string = "/offline";
    const options: OptionsRequest = { method: "GET" };

    await expect(apiFetch(endpoint, options)).rejects.toThrow(networkError);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "API request failed:",
      networkError
    );
  });

  test("deve mesclar headers personalizados com Content-Type", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

    const endpoint: string = "/data";
    const options: OptionsRequest = {
      method: "POST",
      headers: {
        Authorization: "Bearer token123",
        "X-Custom-Header": "value",
      },
      body: JSON.stringify({ item: "new" }),
    };

    await apiFetch(endpoint, options);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token123",
          "X-Custom-Header": "value",
        },
      })
    );
  });
});
