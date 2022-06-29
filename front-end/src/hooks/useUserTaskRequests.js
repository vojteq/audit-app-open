import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useUserTaskRequests() {
  return useQuery(["userTaskRequests"], async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/taskRequests/my`,
    });
    return data;
  });
}
