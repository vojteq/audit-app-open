import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useRoles() {
  return useQuery("roles", async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/employees/roles`,
    });
    return data;
  });
}
