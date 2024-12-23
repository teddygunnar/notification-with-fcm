import React, { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import axios from "axios";

const useFirebaseMessaging = (messaging) => {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(false);

  const requestPermission = async () => {
    const _permission = await Notification.requestPermission();
    setPermission(_permission);
    setLoading(true);
    if (permission === "granted") {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BIuNV-Pn8UNFz1sM1ni10jn0YOk79rh5fcYeS50xzcLW92TeVhwW5gwxNKj4YoIWRqPK62fI6DT_02izVXZJZ4E",
        });

        if (currentToken) {
          setLoading(false);
          setToken(currentToken);
        } else {
          setLoading(false);
          console.log("Key is invalid");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error: ", error);
      }
    } else if (permission === "denied") {
      setLoading(false);
      console.log("User permission denied");
    }
  };

  const handleSendNotification = async (id) => {
    const body = {
      message: {
        token:
          "fdHG-6fQLMKjHHPjlkEMIA:APA91bESmnDy6D-Y0c4gPZfe_QVltDkosOOJdLnL4VRh4DMShrNW3ipc2f9Vkgyh2ikKjI3HzAyHlGrobdSxtF9CIjG505-nBA3ubr0ORYhqoF7dFt-71cs",
        notification: {
          title: `Changes in ID: ${id}`,
          body: `There is changes for ID: ${id}`,
        },
        webpush: {
          fcm_options: {
            link: "https://dummypage.com",
          },
        },
      },
    };

    try {
      return await axios.post(
        "https://fcm.googleapis.com/v1/projects/push-notif-20217/messages:send",
        body,
        {
          headers: {
            Authorization:
              "Bearer ya29.a0AeDClZAM4_1QjLrwb_Uslq9ReppjDYBsz4Zx4NIVbpwZggMze6cHgkXUPFRjZOqHTDoYkWyejtfyTCFlg-266PpEUN6WMUyu6Xd426sIKzIzBnrAJPCGuZvZrRQVvPtrbIIRSuzLEjF9w7CdR725JIHDPA2YQC78wWxpcb1baCgYKAQ4SARISFQHGX2MispaxcV679dkailRbQHirYQ0175",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messaging && !token) requestPermission();
  }, [messaging, token, permission]);

  return { token, loading, handleSendNotification };
};

export default useFirebaseMessaging;
