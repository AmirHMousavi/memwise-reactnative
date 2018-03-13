import React, { Component } from "react";
import { View, Image } from "react-native";
import { Camera, Permissions } from "expo";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  Card,
  Text,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import { dispatch } from "@rematch/core";

class CameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    autoFocus: Camera.Constants.AutoFocus.on,
    flashMode: Camera.Constants.FlashMode.auto,
    photo: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  snap = async () => {
    if (this.camera) {
      await this.camera
        .takePictureAsync({ base64: true, quality: 0.5 })
        .then(photo => {
          this.setState({ photo });
          dispatch.photoModel.addPhoto(photo);
        });
    }
  };

  render() {
    const { photo } = this.state;
    /*     console.log("THE PHOTO ==> ", photo.uri);
 */ const {
      hasCameraPermission
    } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("MapScreen")}
            >
              <Icon name="md-close-circle" />
            </Button>
          </Left>
          <Body>
            <Title>Take Picture</Title>
          </Body>
          <Right>
            {this.state.photo && (
              <Button
                transparent
                onPress={() =>
                  this.props.navigation.navigate("PhotoContentScreen")
                }
              >
                <Icon name="md-arrow-round-forward" />
              </Button>
            )}
          </Right>
        </Header>
        {photo ? (
          <View style={{ flex: 1 }}>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>Review Image</Text>
                    <Text note>powered by native-base</Text>
                  </Body>
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.setState({ photo: null })}
                  >
                    <Icon name="md-close-circle" />
                  </Button>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Image
                  style={{ height: 600, width: null, flex: 1 }}
                  source={{ isStatic: true, uri: photo.uri }}
                />
              </CardItem>
            </Card>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Camera
              style={{ flex: 1 }}
              type={this.state.type}
              autoFocus={this.state.autoFocus}
              flashMode={this.state.flashMode}
              ref={ref => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  marginBottom: 15,
                  alignItems: "flex-end"
                }}
              >
                <Icon
                  name="ios-reverse-camera"
                  style={{ color: "white", fontSize: 36 }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}
                />

                <View style={{ alignItems: "center" }}>
                  <Icon
                    name="camera"
                    style={{ color: "white", fontSize: 65 }}
                    onPress={this.snap}
                  />
                </View>
                <Icon
                  name="images"
                  style={{ color: "white", fontSize: 36 }}
                  onPress={this.pickImage}
                />
              </View>
            </Camera>
          </View>
        )}
      </Container>
    );
  }
}

export default connect(({ photoModel }) => ({ photoModel }))(CameraScreen);
