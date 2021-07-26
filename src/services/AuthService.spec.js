import axios from "axios";
import { Response, createServer } from "miragejs";
import AuthService from "./AuthService";

var authService = new AuthService();

var server = createServer();

beforeEach(() => {
  server.post("/accounts/login", () => {
    return new Response(200, {}, { jwt: "jwt" });
  });
  server.get("/unauthorized", () => {
    return new Response(401);
  });
});

it("can send login", (done) => {
  authService.login().then((token) => {
    expect(token).toEqual("jwt");
    done();
  });
});

it("can add authorization header", (done) => {
  let authorization;
  server.get("/accounts/authenticated", (schema, req) => {
    authorization = req.requestHeaders.Authorization;
    return new Response(200);
  });
  authService.testAuthentication().then(() => {
    expect(authorization).toBe("Bearer jwt");
    done();
  });
});

it("logout on 401", async () => {
  expect(authService.isAuthenticated).toBeTruthy();
  let res = await axios.get("/unauthorized").catch((error) => {
    return error;
  });
  expect(authService.isAuthenticated).toBeFalsy();
  expect(localStorage.getItem(authService.token)).toBeNull();
});
