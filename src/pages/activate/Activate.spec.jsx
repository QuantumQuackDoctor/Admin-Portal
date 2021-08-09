import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter, Route } from "react-router";
import Activate from "./Activate";

describe("activate component", () => {
  var adapter = new MockAdapter(axios);

  it("should send activate on load", () => {
    adapter.onPost("/accounts/activate/token").reply(() => {
      return [200];
    });

    render(
      <MemoryRouter initialEntries={["/activate/token"]}>
        <Route path="/activate/:token">
          <Activate />
        </Route>
      </MemoryRouter>
    );
    return waitFor(() => {
      expect(screen.getByText("Activation successful")).toBeInTheDocument();
    });
  });
});
