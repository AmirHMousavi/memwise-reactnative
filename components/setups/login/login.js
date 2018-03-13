import React, { Component } from "react";
import { Alert } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import { Facebook, Google } from "expo";
import * as firebase from "firebase";

import LoginForm from "./loginForm";
import MyHeader from "../../setups/myHeader";

const FB_APP_ID = "399352903837762";
const GG_ANDROID_CLIENT_ID =
  "268165840544-097g31a3qhd0mmu1eun236bp9vdb7b6r.apps.googleusercontent.com";
const GG_IOS_CLIENT_ID =
  "268165840544-82qio6b4kfhnr32e6gge26i70m13tp7m.apps.googleusercontent.com";

class LoginScreen extends Component {
  /*   state = {
    responseJSON: null
  }; */

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: GG_ANDROID_CLIENT_ID,
        iosClientId: GG_IOS_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        /*         console.log("GGLOGIN RESULT: ", result);
 */ // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        /*         console.log("credential: ", credential);
 */ firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            console.log("this USER is RETURNED ==>>:", user);
          })
          .catch(error => {
            Alert.alert(JSON.stringify(error));
            /*             console.log("signInWithCredential error: ", error);
 */
          });
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };
  loginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FB_APP_ID,
      {
        permissions: ["public_profile", "email"]
      }
    );

    if (type === "success") {
      // authentication with firebase using facebook token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      /*       console.log("credentials: ", credential);
 */ firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          Alert.alert(error);
          /*           console.log("signInWithCredential error: ", error);
 */
        });
      // use callgraph to get user info
      /* this.callGraph(token); */
    }
  };

  /*   callGraph = async token => {
    // / Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = await response.json();
    this.setState({ responseJSON });
  }; */

  openMenu = () => {
    this.props.navigation.navigate("DrawerOpen");
  };
  render() {
    /* console.log("responseJSON: ", this.state.responseJSON); */
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <MyHeader headerName="LoginScreen" onPress={() => this.openMenu} />
        <Content>
          <LoginForm
            signInWithGoogleAsync={() => this.signInWithGoogleAsync}
            loginWithFacebook={() => this.loginWithFacebook}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({ userModel }) => ({ userModel }))(LoginScreen);
