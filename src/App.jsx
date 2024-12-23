import { useEffect, useState } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import axios from "axios";
import useFirebaseMessaging from "./hooks/useFirebaseMessaging";
import firebaseApp from "../firebase";

const App = () => {
  const messaging = getMessaging(firebaseApp);
  const db = getFirestore(firebaseApp);

  const [data, setData] = useState([]);
  const [isInitDataFetch, setIsInitDataFetch] = useState(false);
  const { token, loading, handleSendNotification } =
    useFirebaseMessaging(messaging);

  const [getNotification, setGetNotification] = useState("");

  console.log(token);

  useEffect(() => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      toast(payload.notification.body);
      setGetNotification(payload.notification.body);
    });
  }, [messaging]);

  useEffect(() => {
    return onSnapshot(collection(db, "users"), (snapshot) => {
      const datas = [];
      snapshot.forEach((doc) => datas.push({ id: doc.id, ...doc.data() }));
      setData(datas);

      snapshot.docChanges().forEach((doc) => {
        if (doc.type === "modified") {
          const id = doc.doc.id;

          console.log(doc.doc.data());
          handleSendNotification(id);
        }
      });
    });
  }, []);

  return (
    <>
      {data.map((val) => (
        <ul key={val.id}>
          <li>First Name: {val.firstName}</li>
          <li>Last Name: {val.lastName}</li>
        </ul>
      ))}

      <div>{getNotification}</div>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
