import React from "react";
import {
  compose,
  lifecycle,
  withState,
  withHandlers,
  mapProps
} from "recompose";
import { omit } from "ramda";
import { signinAutomatically, logout } from "./utils/authUtils.js";
import Users from "./components/Users";
import logo from "./logo.svg";
import "./App.css";

const initArrState = () => {
  const arr = [];
  arr._loaded = false; // metadata as array key
  return arr;
};

const State = compose(
  withState("uid", "setUid", null),
  withState("users", "setUsers", {}),
  withState("usersByDate", "setUsersByDate", initArrState())
);

const Handlers = compose(
  withHandlers({
    mergeUsers: ({ users, setUsers }) => newUsers => {
      setUsers({ ...users, ...newUsers });
    }
  }),
  withHandlers({
    changeUsersByDate: ({ setUsersByDate, mergeUsers }) => ({
      data,
      order
    }) => {
      mergeUsers(data);
      order._loaded = true;
      setUsersByDate(order);
    }
  })
);

const App = props => {
  // console.log(props);
  const { uid } = props;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      {!uid ? (
        <p>logging in...</p>
      ) : (
        <div style={{ padding: "10px 0" }}>
          You are logged in with firebase uid:
          <br />
          {uid.slice(0, 5)}
          <br />
          <button onClick={logout}>Logout</button> to reset anonymous login
          <Users {...props} />
        </div>
      )}
    </div>
  );
};

const WithAnonymousSignin = lifecycle({
  unsub() {},
  sub() {
    return signinAutomatically(auth => {
      this.props.setUid(auth && auth.uid);
    });
  },
  componentDidMount() {
    this.unsub = this.sub();
  },
  componentWillUnmount() {
    this.unsub();
  }
});

const Enhance = compose(
  State,
  Handlers,
  WithAnonymousSignin,
  // remove unused props
  mapProps(omit(["setUsersByDate", "setUsers", "setUid", "mergeUsers"]))
);

export default Enhance(App);
