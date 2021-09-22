const dev = {
  basePath: "",
};

const prod = {
  basePath: "https://api.drscrumptious.com",
};

export default process.env.REACT_APP_STAGE === "prod" ? prod : dev;
