import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormBuilder, Validators } from "./FormWidget";

describe("form widget", () => {
  var builder = new FormBuilder();

  beforeEach(() => {
    builder = new FormBuilder("init");
  });

  it("can create", () => {
    render(builder.build());
  });

  it("can add fields", () => {
    builder.addField("test", "test");
    //each field should have a testid of "form-field-{index}"
    render(builder.build());
    expect(screen.getByTestId("form-field-0")).toBeInTheDocument();
  });

  it("can submit fields", () => {
    builder.addField("test", "test");
    render(
      builder.build((value) => {
        expect(value.test).toEqual("new value");
      })
    );
    let input = screen.getByTestId("form-field-0");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(screen.getByDisplayValue("new value")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("submit"));
  });

  it("can validate input", () => {
    builder
      .addField("test", "test")
      .addValidator(Validators.Email)
      .setErrorMessage("required");
    render(builder.build());
    let input = screen.getByTestId("form-field-0");
    fireEvent.change(input, { target: { value: "email" } });
    expect(screen.getByText("required")).toHaveStyle("visibility: visible");
    fireEvent.change(input, { target: { value: "email@example.com" } });
    expect(screen.getByText("required")).toHaveStyle("visibility: hidden");
  });

  it("can validate submit", () => {
    builder.addField("test", "test").addValidator(Validators.Required);
    let called = false;
    render(
      builder.build(() => {
        called = true;
      })
    );
    fireEvent.click(screen.getByTestId("submit"));
    expect(called).toEqual(false);

    let input = screen.getByTestId("form-field-0");
    fireEvent.change(input, { target: { value: "new value" } });
    fireEvent.click(screen.getByTestId("submit"));
    expect(called).toEqual(true);
  });

  it("can display child component", async () => {
    builder.setChildComponent(<>testChild</>);
    render(builder.build());
    let child = await screen.findByText("testChild");
    expect(child).toBeTruthy();
  });

  it("can display reset button", () => {
    builder.setShowReset(true);
    render(builder.build());
    let reset = screen.getByTestId("reset");
    expect(reset).toBeTruthy();
  });

  it("can reset fields to initial value", () => {
    let initialValue = "initval";
    builder.setShowReset(true);
    builder.addField("test", "test").setInitialValue(initialValue);
    render(builder.build());
    let reset = screen.getByTestId("reset");
    expect(reset).toBeTruthy();

    let field = screen.getByLabelText("test");
    fireEvent.change(field, { target: { value: "new value" } });
    expect(screen.getByDisplayValue("new value")).toBeTruthy(); //value is changed

    fireEvent.click(reset);
    expect(screen.getByDisplayValue(initialValue)).toBeTruthy(); //value is back to initial
  });
});
