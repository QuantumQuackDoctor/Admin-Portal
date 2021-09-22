import axios from "axios";
import environment from "../environment";

export const getDriver = (id) => {
  return axios.get(environment.basePath + `/accounts/driver/${id}`);
};

export const createDriver = (driver) => {
  return axios.put(environment.basePath + "/accounts/driver", driver);
};

export const updateDriver = (driver, updatePassword) => {
  return axios.post(environment.basePath + "/accounts/driver", driver, {
    params: { "update-password": updatePassword },
  });
};

export const deleteDriver = (id) => {
  return axios.delete(environment.basePath + `/accounts/driver/${id}`);
};
