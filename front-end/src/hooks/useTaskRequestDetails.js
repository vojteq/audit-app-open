import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useTaskRequestDetails(taskId) {
  return useQuery(
    ["taskRequestDetails", taskId],
    async () => {
      const { data } = await axios({
        method: "get",
        url: `${API_URL}/taskRequests/${taskId}`,
      });
      return data;
    },
    {
      enabled: !!taskId,
    }
  );
}
