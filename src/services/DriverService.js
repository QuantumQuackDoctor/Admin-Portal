import axios from "axios";

export const getDriver = (id) => {
  return axios.get(`/accounts/driver/${id}`);
};

export const createDriver = (driver) => {
  return axios.put("/accounts/driver", driver);
};
