import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useMyTasks() {
  return useQuery(["myTasks"], async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/tasks`,
    });
    return data;
  });
}
