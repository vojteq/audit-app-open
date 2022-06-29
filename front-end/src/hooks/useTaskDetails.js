import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useTaskDetails(taskId) {
  return useQuery(
    ["taskDetails", taskId],
    async () => {
      const { data } = await axios({
        method: "get",
        url: `${API_URL}/tasks/${taskId}`,
      });
      return data;
    },
    {
      enabled: !!taskId,
    }
  );
}
