import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatch } from "@rematch/core";
import * as firebase from "firebase";

import LoginScreen from "./login/login";
import AppNav from "./appnav";

class AppInit extends Component {
  state = {
    isAuthenticated: false
  };
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("USER:=> NOT NULL");
        this.setState({ isAuthenticated: true });
      } else {
        console.log("USER:=> is NULL");
        this.setState({ isAuthenticated: false });
      }
      dispatch.userModel.addUser(user);
    });
  }
  render() {
    if (this.state.isAuthenticated) {
      return <AppNav />;
    }
    return <LoginScreen />;
  }
}

export default connect(({ userModel }) => ({ userModel }))(AppInit);
