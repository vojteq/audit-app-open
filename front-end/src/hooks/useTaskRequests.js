import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useTaskRequests() {
  return useQuery(["taskRequests"], async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/taskRequests`,
    });
    return data;
  });
}
