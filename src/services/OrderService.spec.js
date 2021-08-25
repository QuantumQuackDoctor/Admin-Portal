import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import OrderService from "./OrderService";

describe("Order service tests", () => {
  var orderService = new OrderService();
  var adapter = new MockAdapter(axios);

  adapter.onGet("/order").reply(200);

  it("find an order", (done) => {
    done();
  });


});
