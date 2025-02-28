import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import UserCard from "../components/UserCard";
import { ChakraProvider } from "@chakra-ui/react";

test("renders user details and handles click event", async () => {
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

  const mockClick = vi.fn();

  render(
    <ChakraProvider>
      <UserCard user={mockUser} onClick={mockClick} />
    </ChakraProvider>
  );

  expect(screen.getByText("Emily Johnson")).to.exist;
  expect(screen.getByText("emily.johnson@x.dummyjson.com")).to.exist;

  await userEvent.click(screen.getByText("View Profile"));
  expect(mockClick).toHaveBeenCalledTimes(1);
});
