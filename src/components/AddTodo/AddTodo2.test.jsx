import { render, screen } from "@testing-library/react";
import AddTodo from "./index";
import * as useAuthContext from "../Auth/useAuthContext";
import "@testing-library/jest-dom/extend-expect";

// Setup jest to spy on the useAuthContext hook we will mock
const useAuthContextHookSpy = jest.spyOn(useAuthContext, "default");

// Return a fake user auth object
useAuthContextHookSpy.mockImplementation(() => ({
  user: {
    displayName: "Test User",
    email: "testuser@gmail.com",
    photo: "testPhoto.jpg",
    uid: "some_uid",
  },
}));

test('The button with label "Add Task" renders', () => {
  // Arrange
  render(<AddTodo />);
  // Assert
  expect(screen.getByRole("button", { label: "Add Task" })).toBeInTheDocument();
});

// restore the mocked fn back to it's original state
useAuthContextHookSpy.mockRestore();
