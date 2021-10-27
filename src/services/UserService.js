import axios from "axios";
import environment from "../environment";

export const getCurrentUser = () => {
  return axios.get(environment.basePath + "/accounts/user");
};

/**
 *
 * @param {number} id
 */
export const getUserById = (id) => {
  return axios.get(environment.basePath + "/accounts/users?id=" + id);
};

/**
 *
 * @param {string} email
 */
export const getUserByEmail = (email) => {
  return axios.get(environment.basePath + "/accounts/users?email=" + email);
};
