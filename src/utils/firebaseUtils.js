import firebase from "firebase";
import firestore from "firebase/firestore"; // eslint-disable-line no-unused-vars
import config from "../config";

firebase.initializeApp(config.firebase);

export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();

export function unwrapSnapshot(snapshot) {
  let data = {},
    order = [];
  snapshot.forEach(doc => {
    data[doc.id] = doc.data();
    order.push(doc.id);
  });
  return { data, order };
}
