import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useCompanies() {
  return useQuery("companies", async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/companies`,
    });
    return data;
  });
}
