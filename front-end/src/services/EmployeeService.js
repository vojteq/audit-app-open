import { API_URL } from "../api";
import axios from "axios";

export const postNewEmployee = (employee) => {
  return axios({
    method: "post",
    url: `${API_URL}/employees`,
    data: employee,
  });
};

export const changePassword = (requestData) => {
  return axios({
    method: "put",
    url: `${API_URL}/employees/changePassword`,
    data: requestData,
  });
};

export const putEditedEmployee = (employee) => {
  return axios({
    method: "put",
    url: `${API_URL}/employees`,
    data: employee,
  });
};

export const deleteEmployee = (employeeId) => {
  return axios({
    method: "delete",
    url: `${API_URL}/employees?employeeId=${employeeId}`,
  });
};
