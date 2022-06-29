import { API_URL } from "../api";
import axios from "axios";

export const postNewTeam = (team) => {
  return axios({
    method: "post",
    url: `${API_URL}/teams`,
    data: team,
  });
};

export const deleteTeam = (teamId) => {
  return axios({
    method: "delete",
    url: `${API_URL}/teams?teamId=${teamId}`,
  });
};
