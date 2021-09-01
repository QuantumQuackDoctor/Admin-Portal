import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import EditDriverWidget from "./EditDriverWidget";
import { configure, render } from "enzyme";
import { waitFor } from "@testing-library/react";

describe("edit driver widget test", () => {
  var adapter = new MockAdapter(axios);

  adapter.onGet("/accounts/driver/1").reply(200, {
    id: 1,
    email: "email@example.com",
    firstName: "first",
    lastName: "last",
    car: "blue car",
    DOB: "2000-07-07",
    phone: "5555555555",
  });

  configure({ adapter: new Adapter() });

  it("gets driver", () => {
    const httpSpy = jest.spyOn(axios, "get");
    const wrapper = render(
      <EditDriverWidget
        id="1"
        close={() => {
          throw new Error("didn't open");
        }}
      />
    );
    return waitFor(() => {
      expect(httpSpy).toHaveBeenCalled();
    });
  });
});
