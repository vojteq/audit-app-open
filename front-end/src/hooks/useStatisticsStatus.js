import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";
import { buildUrlWithFilterParams } from "../components/utils/buildUrlWithFilterParams";

export default function useStatisticsStatus(
  year = new Date().getFullYear(),
  taskManagersIds,
  teamsIds,
  methodologiesNames,
  taskStatuses,
  adHoc
) {
  const baseUrl = `${API_URL}/statistics/status?year=${year}`;
  const url = buildUrlWithFilterParams(
    baseUrl,
    taskManagersIds,
    teamsIds,
    methodologiesNames,
    taskStatuses,
    adHoc
  );

  return useQuery(
    [
      "statistics",
      "status",
      year,
      taskManagersIds,
      teamsIds,
      methodologiesNames,
      taskStatuses,
      adHoc,
    ],
    async () => {
      return await axios({
        method: "get",
        url: url,
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
      enabled: !!year,
    }
  );
}
