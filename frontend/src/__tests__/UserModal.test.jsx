import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import UserModal from "../components/UserModal";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";

const mockUser = {
  id: 1,
  firstName: "Emily",
  lastName: "Johnson",
  email: "emily.johnson@x.dummyjson.com",
  phone: "123-456-7890",
  gender: "FEMALE",
  bloodGroup: "O+",
  image: "/emily.jpg",
};

vi.stubGlobal(
  "fetch",
  vi.fn(async () => ({
    json: async () => ({ data: mockUser }),
  }))
);

test("renders user modal with full details", async () => {
  render(
    <ChakraProvider>
      <UserModal isOpen={true} onClose={() => {}} userId={1} />
    </ChakraProvider>
  );

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Emily Johnson")).toBeInTheDocument();
    expect(
      screen.getByText("emily.johnson@x.dummyjson.com")
    ).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("FEMALE")).toBeInTheDocument();
    expect(screen.getByText("Blood Group: O+")).toBeInTheDocument();
  });
});
