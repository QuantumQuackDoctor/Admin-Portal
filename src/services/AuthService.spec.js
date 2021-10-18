import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AuthService from "./AuthService";

describe("Auth service tests", () => {
  var authService = new AuthService();
  var adapter = new MockAdapter(axios);

  adapter.onPost("/accounts/login").reply(200, { jwt: "jwt" });

  it("can send login", (done) => {
    authService.login().then((token) => {
      expect(token).toEqual("jwt");
      done();
    });
  });

  it("can add authorization header", (done) => {
    let authorization;
    adapter.onGet("/accounts/authenticated").reply((config) => {
      authorization = config.headers.Authorization;
      return [200];
    });
    authService.testAuthentication().then(() => {
      expect(authorization).toBe("Bearer jwt");
      done();
    });
  });

  adapter.onGet("/unauthorized").reply(401);

  it("logout on 401", async () => {
    expect(authService.isAuthenticated).toBeTruthy();
    await axios.get("/unauthorized").catch((error) => {
      return error;
    });
    expect(authService.isAuthenticated).toBeFalsy();
    expect(localStorage.getItem(authService.token)).toBeNull();
  });
});
