import { addDoc, collection } from "firebase/firestore";
import { getDatabase } from "../../../firebase-config";

const database = getDatabase();

const handleCreateUser = async ({ name, email, id, given_name, picture }) => {
  try {
    await addDoc(collection(database, "users"), {
      name,
      email,
      id,
      given_name,
      picture,
    });
  } catch (err) {
    console.error(err);
  }
};

export default handleCreateUser;
