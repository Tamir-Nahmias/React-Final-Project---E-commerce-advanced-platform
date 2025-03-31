import axios from "axios";
import db from "../fireBase/fireBase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

const getDataById = (url, id) => {
  return axios.get(url, id);
};

const addDocument = (table, obj) => {
  addDoc(collection(db, table), obj);
};

export { getDataById, addDocument };
