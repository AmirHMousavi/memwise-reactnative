import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Icon,
  Text,
  Spinner,
  Card
} from "native-base";
import * as firebase from "firebase";

import MyHeader from "../../setups/myHeader";

class MemoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: []
    };
  }

  componentWillMount() {
    console.log(
      "appinit willMount, isAuthenticated:",
      this.state.isAuthenticated
    );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref(`/users/${user.uid}/memories`)
          .once("value", snapshot => {
            snapshot.forEach(childSnapshot => {
              const value = childSnapshot.val();
              value.key = childSnapshot.key;
              const newData = [...this.state.listViewData];
              newData.push(value);
              this.setState({ listViewData: newData });
            });
          });
      } else {
        console.log("USER:=> is NULL");
        this.setState({ isAuthenticated: false });
      }
    });
  }
  mapArray = () => {
    this.state.listViewData.map(y => (
      <ListItem>
        <Text>{y.key}</Text>
      </ListItem>
    ));
  };

  openMenu = () => {
    this.props.navigation.navigate("DrawerOpen");
  };
  render() {
    const { listViewData } = this.state;
    console.log("LIST VIEW DATA ===>>>", listViewData);
    if (listViewData.length === 0) {
      return (
        <Container style={styles.container}>
          <MyHeader onPress={() => this.openMenu} headerName="MemoryList" />
          <Spinner />
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <MyHeader onPress={() => this.openMenu} headerName="MemoryList" />

        <View>
          {listViewData.map(
            (description, photo, region, timestamp, key, title) => (
              <Text>{key}</Text>
            )
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

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

export default MemoryList;
