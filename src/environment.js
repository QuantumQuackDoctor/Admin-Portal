import process from "process";

const dev = {
  basePath: "",
};

const prod = {
  basePath: "https://api.drscrumptious.com",
};

export default process.env.NODE_ENV === "production" ? prod : dev;
