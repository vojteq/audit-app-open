import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";

export default function useCompaniesWithDeletionInfo() {
  return useQuery(["companiesWithDeletionInfo"], async () => {
    return await axios({
      method: "get",
      url: `${API_URL}/companies/withDeletionInfo`,
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
