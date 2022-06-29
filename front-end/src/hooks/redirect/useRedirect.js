import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export const useRedirect = (targetUrl = "/", timeout = 2000) => {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let timer;
    if (redirect) {
      timer = setTimeout(() => {
        history.push(targetUrl);
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [redirect, history, targetUrl, timeout]);

  return [redirect, setRedirect];
};
