import { API_URL } from "../api";
import axios from "axios";

export const postNewCompany = (company) => {
  return axios({
    method: "post",
    url: `${API_URL}/companies`,
    data: company,
  });
};

export const deleteCompany = (companyId) => {
  return axios({
    method: "delete",
    url: `${API_URL}/companies?companyId=${companyId}`,
  });
};
