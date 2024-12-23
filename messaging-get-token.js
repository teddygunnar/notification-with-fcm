import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";

const useMessagingGetToken = (app) => {
  const [token, setToken] = useState("");
  const messaging = getMessaging(app);

  const getTokenFunc = async () => {
    if (!app) return;
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BHRYxLaEyDpQzR-FdA8M7dJTewDx6m5q5HJ663MFjaBgVKGpCft-kcvlmm9ymuUHeiR-oxWOmcqZe1C3nN9Ox1Y",
      });
      if (currentToken) {
        console.log(currentToken);
        setToken(currentToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (app) getTokenFunc();
  }, [app]);

  return { token };
};

export default useMessagingGetToken;
