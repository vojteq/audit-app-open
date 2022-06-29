import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function usePlanItems(planId) {
  return useQuery(
    ["planItems", planId],
    async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${API_URL}/plan/${planId}/items`,
        });
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    {
      enabled: !!planId,
    }
  );
}
