import React from "react";
import * as Expo from "expo";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import * as firebase from "firebase";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import AppInit from "./components/setups/appinit";

/* import locationModel from "./components/models/locationModel";
import userModel from "./components/models/userModel"; */
import * as models from "./components/models/models";

const globalRoboto = require("native-base/Fonts/Roboto.ttf");
const globalRobotomedium = require("native-base/Fonts/Roboto_medium.ttf");
const gloablIonicons = require("@expo/vector-icons/fonts/Ionicons.ttf");

const store = init({
  models
});

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtnsWulA2co5Ghx7s6UauCs8-IyD3RU1w",
  authDomain: "memwise-cd6e0.firebaseapp.com",
  databaseURL: "https://memwise-cd6e0.firebaseio.com",
  projectId: "memwise-cd6e0",
  storageBucket: "memwise-cd6e0.appspot.com",
  messagingSenderId: "74739269174"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: globalRoboto,
      Roboto_medium: globalRobotomedium,
      Ionicons: gloablIonicons
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <Expo.AppLoading
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center"
          }}
        />
      );
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <AppInit />
        </StyleProvider>
      </Provider>
    );
  }
}
