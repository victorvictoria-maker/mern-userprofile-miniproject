import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, test, expect, it } from "vitest";
import App from "../App";
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from "vitest";

const mockUsers = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  firstName: `User${i + 1}`,
  lastName: `Test${i + 1}`,
  email: `user${i + 1}@example.com`,
  image: `/user${i + 1}.jpg`,
  gender: i % 2 === 0 ? "MALE" : "FEMALE",
}));

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url) => {
      if (url.includes("/api/users/")) {
        return {
          json: async () => ({
            data: {
              id: 1,
              firstName: "Emily",
              lastName: "Johnson",
              email: "emily.johnson@x.dummyjson.com",
              phone: "123-456-7890",
              gender: "FEMALE",
              bloodGroup: "O+",
              image: "/emily.jpg",
            },
          }),
        };
      }

      return {
        json: async () => ({ data: { users: mockUsers } }),
      };
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App Component", () => {
  it("renders the header correctly", async () => {
    await act(async () => {
      render(
        <ChakraProvider>
          <App />
        </ChakraProvider>
      );
    });

    expect(screen.getByText("User Directory")).toBeInTheDocument();
  });

  test("fetches and displays users correctly", async () => {
    await act(async () => {
      render(
        <ChakraProvider>
          <App />
        </ChakraProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    const userCards = screen.getAllByRole("heading", { level: 2 });
    expect(userCards).toHaveLength(20);
  });
});
