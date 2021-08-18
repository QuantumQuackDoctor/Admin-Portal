import axios from "axios";

export const getCurrentUser = () => {
  return axios.get("/accounts/user");
};
