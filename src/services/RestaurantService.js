import axios from "axios";
import environment from "../environment";

/**
 *
 * @param {FormData} formData
 */
export const uploadCsv = (formData) => {
  return axios.post(environment.basePath + "/restaurants/csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
