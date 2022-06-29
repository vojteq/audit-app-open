import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useTeamByTeamId(teamId) {
  return useQuery(
    ["teamByTeamId", teamId],
    async () => {
      const { data } = await axios({
        method: "get",
        url: `${API_URL}/teams/${teamId}`,
      });
      return data;
    },
    {
      enabled: !!teamId,
    }
  );
}
