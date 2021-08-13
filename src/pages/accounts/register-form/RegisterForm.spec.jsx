import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Router } from "react-router-dom";

describe("register form test", () => {
  it("can create", () => {
    render(<RegisterForm />);
  });

  var adapter = new MockAdapter(axios);

  it("sends register to server and redirects", () => {
    adapter.onPut("/accounts/register?admin=true").reply((req) => {
      return [200];
    });

    const httpSpy = jest.spyOn(axios, "put");
    const historySpy = jest.fn();
    const history = { push: historySpy, location: {}, listen: jest.fn() };

    render(
      <Router history={history}>
        <RegisterForm />
      </Router>
    );

    let email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "email@example.com" } });
    let password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "password" } });
    let firstName = screen.getByLabelText("First name");
    fireEvent.change(firstName, { target: { value: "name" } });
    let DOB = screen.getByLabelText("Birth date");
    fireEvent.change(DOB, { target: { value: "2021-07-15" } });

    fireEvent.click(screen.getByTestId("submit"));

    return waitFor(() => {
      expect(httpSpy).toHaveBeenCalled();
    });
  });
});
