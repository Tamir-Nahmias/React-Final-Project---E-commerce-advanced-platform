import axios from 'axios';
import db from '../fireBase/fireBase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';

const getDataById = (url, id) => {
  return axios.get(url, id);
};

const addDocument = (table, obj) => {
  return addDoc(collection(db, table), obj);
};

const getAllDocs = (setterFunc, dbName) => {
  const q = query(collection(db, dbName));
  onSnapshot(q, (querySnapShot) => {
    setterFunc(
      querySnapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
    );
  });
};

const getCollectionById = (stterFunc, collectionName, id) => {
  const q = query(collection(db, collectionName), where('userId', '==', id));
  onSnapshot(q, (querySnapShot) => {
    stterFunc(
      querySnapShot.docs.map((doc) => {
        return {
          id: doc.id,

          ...doc.data(),
        };
      })
    );
  });
};

export { getDataById, addDocument, getAllDocs, getCollectionById };
