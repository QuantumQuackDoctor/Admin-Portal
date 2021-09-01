import axios from "axios";

export const getDriver = (id) => {
  return axios.get(`/accounts/driver/${id}`);
};

export const createDriver = (driver) => {
  return axios.put("/accounts/driver", driver);
};

export const updateDriver = (driver, updatePassword) => {
  return axios.post("/accounts/driver", driver, {
    params: { "update-password": updatePassword },
  });
};
