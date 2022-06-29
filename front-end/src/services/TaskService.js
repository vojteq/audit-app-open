import axios from "axios";
import { API_URL } from "../api";

export const fetchTaskDetails = (id) => {
  return axios({
    method: "get",
    url: `${API_URL}/tasks/${id}`,
  });
};

export const fetchTaskProgress = (id) => {
  return axios({
    method: "get",
    url: `${API_URL}/tasks/${id}/progress`,
  });
};

export const updateMilestone = (updatedMilestone) => {
  return axios({
    method: "put",
    url: `${API_URL}/milestones`,
    data: updatedMilestone,
  });
};

export const addCorrectedFinishDate = (id, correctedFinishDate) => {
  return axios({
    method: "put",
    url: `${API_URL}/tasks/${id}/correctedDate`,
    data: { date: correctedFinishDate },
  });
};

export const addFinishDate = (id, finishDate) => {
  return axios({
    method: "put",
    url: `${API_URL}/tasks/${id}/finishedDate`,
    data: { date: finishDate },
  });
};

export const postNewTask = (taskInfo) => {
  return axios({
    method: "post",
    url: `${API_URL}/taskRequests`,
    data: taskInfo,
  });
};

export const acceptTask = (taskInfo) => {
  return axios({
    method: "put",
    url: `${API_URL}/taskRequests/acceptance`,
    data: taskInfo,
  });
};

export const rejectTask = (taskRequestId) => {
  return axios({
    method: "put",
    url: `${API_URL}/taskRequests/rejection?taskRequestId=${taskRequestId}`,
  });
};

export const editTask = (taskInfo) => {
  return axios({
    method: "PUT",
    url: `${API_URL}/tasks/edit`,
    data: taskInfo,
  });
};

export const setSuspend = (id, isSuspended, reason) => {
  return axios({
    method: "PUT",
    url: `${API_URL}/tasks/${id}/suspended`,
    data: { isSuspended, reason },
  });
};

export const setOperationalActionsNeeded = (taskId) => {
  return axios({
    method: "PUT",
    url: `${API_URL}/tasks/${taskId}/actions/operational`,
  });
};
