import { API_URL } from "../api";
import axios from "axios";

export const fetchPlanSummary = (companyId, year) => {
  return axios({
    method: "get",
    url: `${API_URL}/plan/forCompany?companyId=${companyId}&year=${year}`,
  });
};

export const fetchPlanItems = (planId) => {
  return axios({
    method: "get",
    url: `${API_URL}/plan/${planId}/items`,
  });
};

export const fetchCompanyNames = async () => {
  return axios({
    method: "get",
    url: `${API_URL}/companies`,
  });
};

export const addPlanItem = (planItem) => {
  return axios({
    method: "post",
    url: `${API_URL}/planItem`,
    data: {
      planId: planItem.planId,
      planItemTitle: planItem.planItemTitle,
    },
  });
};

export const postNewPlan = (planInfo) => {
  return axios({
    method: "post",
    url: `${API_URL}/plan`,
    data: planInfo,
  });
};

export const moveTasks = async (planId) => {
  return await axios({
    method: "put",
    url: `${API_URL}/plan/${planId}/move`,
  })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error.response.data.error;
    });
};

export const removePlanItem = (planItemId) => {
  return axios({
    method: "delete",
    url: `${API_URL}/planItem?planItemId=${planItemId}`,
  });
};
