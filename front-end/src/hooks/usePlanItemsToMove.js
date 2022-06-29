import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function usePlanItemsToMove(teamId, year) {
  return useQuery(
    ["planItemsToMove", teamId, year],
    async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `${API_URL}/plan/items/toMove?year=${year}&teamId=${teamId}`,
        });
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    {
      enabled: !!teamId && !!year,
    }
  );
}
