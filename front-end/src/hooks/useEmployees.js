import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useEmployees() {
  return useQuery("employees", async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/employees`,
    });
    return data;
  });
}
