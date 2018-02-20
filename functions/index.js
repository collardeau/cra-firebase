const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
const { serverTimestamp } = admin.firestore.FieldValue;

const usersCollection = firestore.collection("users");

exports.onUserCreate = functions.auth.user().onCreate(event => {
  console.log(event.data);
  const { uid } = event.data;
  return usersCollection
    .doc(uid)
    .set({ uid, createdAt: serverTimestamp() })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
});
