import axios from "axios";

export const getCurrentUser = () => {
  return axios.get("/accounts/user");
};

export const deleteCurrentUser = () => {
  return axios.delete("/accounts/user");
};
