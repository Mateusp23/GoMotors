import { doc } from "firebase/firestore";
import { getDatabase } from "../../firebase-config";

const database = getDatabase();

const getDocFirebaseRef = (idRef, collection) => {
  return doc(database, collection.path, idRef);
};

export { getDocFirebaseRef };
