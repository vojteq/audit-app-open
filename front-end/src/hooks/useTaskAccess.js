import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useTaskAccess(taskId) {
  return useQuery(
    ["taskAccess", taskId],
    async () => {
      return await axios({
        method: "get",
        url: `${API_URL}/tasks/accessibility?taskId=${taskId}`,
      })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          return data;
        })
        .catch(function (error) {
          return error;
        });
    },
    {
      enabled: !!taskId,
    }
  );
}
