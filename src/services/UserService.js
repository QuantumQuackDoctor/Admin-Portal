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

export const updateUser = (user, updatePassword) => {
  if (updatePassword === false) user.password = "123456789";
  return axios.post(
    environment.basePath +
      `/accounts/user/update?update-password=${updatePassword}`,
    user
  );
};
