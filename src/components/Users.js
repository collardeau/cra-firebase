import React from "react";
import { compose, lifecycle, mapProps } from "recompose";
import { syncUsersByDate } from "../db.js";

const Users = ({ loaded, users }) => (
  <div>
    <h3>Users in Firestore</h3>
    Users loaded: {loaded ? "yes" : "no"}
    <UserList users={users} />
  </div>
);

const UserList = ({ users }) => (
  <div style={{ padding: "10px 0" }}>
    {users.map(u => (
      <div key={u.uid}>
        {u.uid.slice(0, 5)} - {u.createdAt.toString()}
      </div>
    ))}
  </div>
);

const WithRealTimeUsers = lifecycle({
  sub() {
    return syncUsersByDate(this.props.changeUsersByDate);
  },
  unsub() {},
  componentWillMount() {
    this.unsub = this.sub();
  },
  componentWillUnmount() {
    this.unsub();
  }
});

const Enhance = compose(
  WithRealTimeUsers,
  mapProps(({ users, usersByDate }) => ({
    users: usersByDate.map(uid => users[uid]),
    loaded: usersByDate._loaded
  }))
);

export default Enhance(Users);
