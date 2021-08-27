const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/accounts",
    createProxyMiddleware({
      target: "http://localhost:8081",
    })
  );
  app.use(
    "/order",
    createProxyMiddleware({
      target: "http://localhost:8080",
    })
  );
};
