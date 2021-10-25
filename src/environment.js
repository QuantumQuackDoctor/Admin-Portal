const dev = {
  basePath: "",
};

const prod = {
  basePath: "https://api.drscrumptious.com",
};

// eslint-disable-next-line no-undef
export default process.env.NODE_ENV === "production" ? prod : dev;
