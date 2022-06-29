import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function usePlanSummary(year, teamId) {
  return useQuery(
    ["planSummary", year, teamId],
    async () => {
      return await axios({
        method: "get",
        url: `${API_URL}/plan/forTeam?teamId=${teamId}&year=${year}`,
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
    },

    {
      enabled: !!teamId && !!year,
    }
  );
}
