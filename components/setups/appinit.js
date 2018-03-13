import React, { Component } from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";

import LoginScreen from "./login/login";
import AppNav from "./appnav";

class AppInit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
      /*       uid: null
 */
    };
  }

  componentWillMount() {
    console.log(
      "appinit willMount, isAuthenticated:",
      this.state.isAuthenticated
    );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(" appinit got user:=>", user.uid);
        this.setState({ isAuthenticated: true });
        /*         this.setState({ uid: user.uid }); */
        this.props.addUser(user);
        /*         const listViewData = [];
        firebase
          .database()
          .ref(`/users/${user.uid}/memories`)
          .once("value", snapshot => {
            snapshot.forEach(childSnapshot => {
              const key = childSnapshot.key;
              key.memory = childSnapshot.val();
              listViewData.push(key);
            });
          })
          .then(this.props.addMemory(listViewData)); */
      } else {
        console.log("USER:=> is NULL");
        this.setState({ isAuthenticated: false });
      }
    });
  }
  /*   componentDidMount() {
    console.log(
      "app init didMount ",
      this.state.uid,
      "isAuthenticated:",
      this.state.isAuthenticated
    );

    firebase
      .database()
      .ref(`/users/${this.state.uid}/memories`)
      .on("child_added", data => {
        console.log(data);
      });
  } */

  render() {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <AppNav />;
    }
    return <LoginScreen />;
  }
}

const mapStateToProps = state => {
  const { photo } = state.photoModel;
  const { region } = state.locationModel;
  const { user } = state.userModel;
  const { listViewData } = state.memoryModel;
  return {
    photo,
    region,
    user,
    listViewData
  };
};

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch.userModel.addUser(user),
  addMemory: memory => dispatch.memoryModel.addMemory(memory)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppInit);
