import axios from "axios";
import { useQuery } from "react-query";
import { API_URL } from "../api";
import fileDownload from "js-file-download";

const getAttachmentFilename = (header) => {
  return header.split('"')[1];
};

export default function useDownloadQuarterStats(planId, quarter) {
  return useQuery(
    ["quarterStats", planId, quarter],
    async () => {
      return await axios
        .get(
          `${API_URL}/quarter/stats/download?planId=${planId}&quarter=${quarter}`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          if (!!res) {
            const filename = getAttachmentFilename(
              res.headers["content-disposition"]
            );
            var blob = new Blob([res.data], {
              type: "application/octet-stream",
            });
            fileDownload(blob, filename);
          }
        });
    },
    { enabled: false }
  );
}
