import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("Order service tests", () => {
  var adapter = new MockAdapter(axios);

  adapter.onGet("/order").reply(200);

  it("find an order", (done) => {
    done();
  });
});
