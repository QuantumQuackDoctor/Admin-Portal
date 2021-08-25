import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FindOrderForm from "./FindOrderForm";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MemoryRouter, Router } from "react-router-dom";
import RegisterForm from "../../accounts/register-form/RegisterForm";

describe("find order test", () => {
    it("creation", () => {
        render(<FindOrderForm />);
    })

    var adapter = new MockAdapter(axios);

    it("sends request for order", () => {
        adapter.onGet("/order", {params: {id: 1}}).reply((req) => {
            return [200];
        });

        const httpSpy = jest.spyOn(axios, "get");
        const historySpy = jest.fn();
        const history = { push: historySpy, location: {}, listen: jest.fn() };

        render(
            <Router history={history}>
                <RegisterForm />
            </Router>
        );
    });
})