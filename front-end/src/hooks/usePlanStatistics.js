import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function usePlanStatistics(planId) {
  return useQuery(
    ["planStatistics", planId],
    async () => {
      const { data } = await axios({
        method: "get",
        url: `${API_URL}/plan/${planId}/status`,
      });
      return data;
    },

    {
      enabled: !!planId,
    }
  );
}
