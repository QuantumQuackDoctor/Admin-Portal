import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Widget } from "./Widget";

it("widget renders with titlte", () => {
  render(<Widget title="Title"></Widget>);
  expect(screen.getByText("Title")).toBeInTheDocument();
});

it("Widget can close", () => {
  render(<Widget></Widget>);
  let titleBar = screen.getByTestId("title-bar");
  let childrenContainer = screen.getByTestId("widget-children");
  expect(childrenContainer).toBeInTheDocument();
  expect(childrenContainer).toHaveStyle("display: block");
  fireEvent.click(titleBar);
  childrenContainer = screen.getByTestId("widget-children");
  expect(childrenContainer).toHaveStyle("display: none");
});
