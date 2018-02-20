import debounce from "lodash.debounce";
import { db, unwrapSnapshot } from "./utils/firebaseUtils";

const MAX_DOCS = 250; // max number of docs to get per request

const users = db.collection("users");
const usersByDate = users.orderBy("createdAt", "desc");

function getCollection({
  query,
  onData,
  onError = console.warn,
  limit = MAX_DOCS
}) {
  return query
    .limit(limit)
    .get()
    .then(snap => {
      onData(unwrapSnapshot(snap));
    })
    .catch(onError);
}

function syncCollection({
  query,
  onData,
  onError = console.warn,
  limit = MAX_DOCS
}) {
  return query.limit(limit).onSnapshot(snap => {
    onData(unwrapSnapshot(snap));
  });
}

// to avoid over-firing get functions
const withDebounce = fn => debounce(fn, 1000 * 15, { leading: true });

// EXPORT DATABASE FUNCTIONS:

export const getUsersByDate = withDebounce(onUsers =>
  getCollection({
    query: usersByDate,
    onData: onUsers
  })
);

export const syncUsersByDate = onUsers =>
  syncCollection({
    query: usersByDate,
    onData: onUsers
  });
