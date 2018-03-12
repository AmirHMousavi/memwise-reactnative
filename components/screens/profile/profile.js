import React, { Component } from "react";
import { View, Image, ImageBackground, Alert } from "react-native";
import {
  Container,
  Text,
  Content,
  Spinner,
  Card,
  Button,
  Icon
} from "native-base";
import { connect } from "react-redux";
import * as firebase from "firebase";

import MyHeader from "../../setups/myHeader";
import styles from "./styles";

const drawerCover = require("../../../assets/sidebarCover.png");

class ProfileScreen extends Component {
  openMenu = () => {
    this.props.navigation.navigate("DrawerOpen");
  };
  logOut = () => {
    console.log("ready to logout");
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert("Successfully Signed Out");
      })
      .catch(err => {
        Alert.alert(JSON.stringify(err));
      });
  };
  render() {
    const { user } = this.props.userModel;
    if (!user) {
      return (
        <Container>
          <MyHeader onPress={() => this.openMenu} headerName="MapScreen" />
          <View style={styles.container}>
            <Spinner style={{ alignItems: "center" }} color="blue" />
          </View>
        </Container>
      );
    }
    return (
      <Container>
        <MyHeader onPress={() => this.openMenu} headerName="MapScreen" />
        <Content>
          <View style={styles.headerContainer}>
            <ImageBackground
              style={styles.headerBackgroundImage}
              blurRadius={10}
              source={drawerCover}
            >
              <View style={styles.headerColumn}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: user.photoURL
                  }}
                />
                <Text style={styles.userNameText}>{user.displayName}</Text>
                <View style={styles.userAddressRow}>
                  <Text style={styles.userCityText}>{user.email}</Text>
                </View>
              </View>
            </ImageBackground>
            <View>
              <Card>
                <Button
                  iconLeft
                  block
                  rounded
                  danger
                  large
                  style={{ margin: 15, marginTop: 15 }}
                  onPress={() => this.logOut()}
                >
                  <Icon active name="ios-log-out-outline" />
                  <Text>Logout</Text>
                </Button>
              </Card>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(({ userModel }) => ({ userModel }))(ProfileScreen);
