import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useMethodologies() {
  return useQuery(["methodologies"], async () => {
    const { data } = await axios({
      method: "get",
      url: `${API_URL}/methodologies`,
    });
    return data;
  });
}
