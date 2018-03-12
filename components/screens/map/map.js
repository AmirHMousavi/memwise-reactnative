import React, { Component } from "react";
import { Platform, Text, View, Alert, Dimensions } from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import { Container, Spinner, Fab, Icon, Button } from "native-base";
import { connect } from "react-redux";
import { dispatch } from "@rematch/core";
import MyHeader from "../../setups/myHeader";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
const ratio = width / height;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ratio;

class MapScreen extends Component {
  state = {
    active: false
  };
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      dispatch.locationModel.addErrorMesaage({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.getProviderStatusAsync();
      this.getLocationAsync();
    }
  }

  getProviderStatusAsync = async () => {
    const { locationServicesEnabled } = await Location.getProviderStatusAsync();
    console.log("locationServicesEnabled", locationServicesEnabled);
    if (!locationServicesEnabled) {
      Alert.alert(
        "Location Services are Disabled",
        "Plase Enable your Location service then press OK!"
      );
    }
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      dispatch.locationModel.addErrorMesaage({
        errorMessage: "Permission to access location was denied"
      });
    }

    const location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    console.log("got location Async");

    dispatch.locationModel.addRegion({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    });

    await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        imeInterval: 20000
      },
      position => {
        dispatch.locationModel.addRegion({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      }
    );
  };

  isEmptyObject = o => Object.keys(o).every(x => o[x] === "" || o[x] === null);

  openMenu = () => {
    this.props.navigation.navigate("DrawerOpen");
  };

  render() {
    const { region, errorMessage } = this.props.locationModel;
    console.log(
      "region recieved form store and is:",
      JSON.stringify(region),
      " and errormessage: ",
      errorMessage
    );
    let text = "Waiting..";
    if (this.isEmptyObject(region)) {
      return (
        <Container>
          <MyHeader onPress={() => this.openMenu} headerName="MapScreen" />
          <View style={styles.container}>
            <Spinner style={{ alignItems: "center" }} color="blue" />
          </View>
        </Container>
      );
    } else if (errorMessage) {
      text = errorMessage;
      return (
        <Container>
          <MyHeader onPress={() => this.openMenu} headerName="MapScreen" />
          <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
        </Container>
      );
    }
    text = `${region.latitude.toPrecision(7)} , ${region.longitude.toPrecision(
      7
    )}`;

    return (
      <Container>
        <MyHeader onPress={() => this.openMenu} headerName="MapScreen" />
        <View style={styles.container}>
          <MapView style={styles.map} region={region}>
            <MapView.Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude
              }}
            >
              <View style={styles.mapMarkerOuter}>
                <View style={styles.mapMarkerInner} />
              </View>
            </MapView.Marker>
          </MapView>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#24C624" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="add" />
            <Button
              style={{ backgroundColor: "#34A34F" }}
              onPress={() => this.props.navigation.navigate("CameraScreen")}
            >
              <Icon name="ios-camera" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="md-videocam" />
            </Button>
            <Button disabled style={{ backgroundColor: "#DD5144" }}>
              <Icon name="ios-mic" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

export default connect(({ locationModel }) => ({ locationModel }))(MapScreen);
