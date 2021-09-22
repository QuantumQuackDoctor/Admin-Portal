import axios from "axios";
import environment from "../environment";

export const getCurrentUser = () => {
  return axios.get(environment.basePath + "/accounts/user");
};
