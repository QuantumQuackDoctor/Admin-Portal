import CreateDriverWidget from "./CreateDriverWidget";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import React from "react";

describe("create driver test", () => {
  it("can create", () => {
    render(<CreateDriverWidget />);
  });

  var adapter = new MockAdapter(axios);

  it("sends create to server", () => {
    adapter.onPut("/accounts/driver").reply(200, { id: 1 });

    const httpSpy = jest.spyOn(axios, "put");

    render(<CreateDriverWidget openDriver={() => {}} />);

    let email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "email@example.com" } });
    let password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "password" } });
    let firstName = screen.getByLabelText("First name");
    fireEvent.change(firstName, { target: { value: "name" } });
    let lastName = screen.getByLabelText("Last name");
    fireEvent.change(lastName, { target: { value: "name" } });
    let DOB = screen.getByLabelText("Birth date");
    fireEvent.change(DOB, { target: { value: "2000-07-15" } });
    let phone = screen.getByLabelText("Phone");
    fireEvent.change(phone, { target: { value: "555-555-5555" } });
    let car = screen.getByLabelText("Car");
    fireEvent.change(car, { target: { value: "honda civic" } });

    fireEvent.click(screen.getByTestId("submit"));

    return waitFor(() => {
      expect(httpSpy).toHaveBeenCalled();
    });
  });

  it("validates fields", () => {
    adapter.onPut("/accounts/driver").reply(() => {
      throw new Error("http called");
    });

    const httpSpy = jest.spyOn(axios, "put");

    render(<CreateDriverWidget openDriver={() => {}} />);

    let email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "emaxample.com" } });
    let password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "password" } });
    let firstName = screen.getByLabelText("First name");
    fireEvent.change(firstName, { target: { value: "" } });
    let lastName = screen.getByLabelText("Last name");
    fireEvent.change(lastName, { target: { value: "" } });
    let DOB = screen.getByLabelText("Birth date");
    fireEvent.change(DOB, { target: { value: "-07-15" } });
    let phone = screen.getByLabelText("Phone");
    fireEvent.change(phone, { target: { value: "555-555-5555" } });
    let car = screen.getByLabelText("Car");
    fireEvent.change(car, { target: { value: "i " } });

    fireEvent.click(screen.getByTestId("submit"));

    return waitFor(() => {
      expect(httpSpy).toBeCalledTimes(0);
    });
  });
});
