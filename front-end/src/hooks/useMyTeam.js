import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useMyTeam() {
  return useQuery(["myTeam"], async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/teams/myTeam`,
    });
    return data;
  });
}
