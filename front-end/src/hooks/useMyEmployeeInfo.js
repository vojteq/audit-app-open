import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useMyEmployeeInfo() {
  return useQuery(["myEmployeeInfo"], async () => {
    return await axios({
      method: "get",
      url: `${API_URL}/employees/me`,
    })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error.response.data.error;
      });
  });
}
