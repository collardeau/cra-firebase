import { firebaseAuth } from "./firebaseUtils";

export function signinAutomatically(onAuthChange) {
  return firebaseAuth.onAuthStateChanged(auth => {
    onAuthChange(auth);
    if (!auth) {
      console.log("signing in anonymously");
      firebaseAuth.signInAnonymously().catch(console.warn);
    }
  });
}

export function logout() {
  firebaseAuth.signOut();
}
