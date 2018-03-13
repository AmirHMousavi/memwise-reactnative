import React, { Component } from "react";
import { View, Alert } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Item,
  Input,
  Text
} from "native-base";
import * as firebase from "firebase";
import { connect } from "react-redux";

class PhotoContentScreen extends Component {
  state = {
    title: "",
    description: ""
  };

  componentDidMount() {}

  getBLOB = () => {};
  isEmptyObject = o => Object.keys(o).every(x => o[x] === "" || o[x] === null);

  postMemoryToServer = () => {
    const { uid } = this.props.user;
    /* console.log("UID==>>", uid, `/users/${uid}/memories`); */
    const { key } = firebase
      .database()
      .ref(`/users/${uid}/memories`)
      .push();
    firebase
      .database()
      .ref(`/users/${uid}/memories`)
      .child(key)
      .set({
        title: this.state.title,
        description: this.state.description,
        timestamp: Date.now(),
        region: this.props.region,
        photo: this.props.photo.base64
      });
    Alert.alert("memory successfully uploaded");
    this.props.navigation.navigate("MapScreen");
  };

  render() {
    const { region, photo } = this.props;
    if (photo) {
      /* console.log("form photocontent==>>>", photo.uri); */
      this.getBLOB(photo);
    }
    /* console.log("form photocontent==>>>", region); */

    return (
      <Container>
        <Header backgroundColor="#03c4ad">
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("MapScreen")}
            >
              <Icon name="md-close-circle" />
            </Button>
          </Left>
          <Body>
            <Title>Fill Content</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.postMemoryToServer(photo.uri)}
            >
              <Text>POST</Text>
              <Icon name="md-arrow-round-forward" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            <Item regular>
              <Input
                placeholder="Title"
                onChange={title => this.setState({ title })}
              />
            </Item>
            <Item regular style={{ height: 200 }}>
              <Input
                placeholder="Description"
                onChange={description => this.setState({ description })}
              />
            </Item>
            <Item regular>
              {this.isEmptyObject(region) ? (
                <Text>NoLocation Loaded yet</Text>
              ) : (
                <Text>
                  {region.latitude.toPrecision(7)},
                  {region.longitude.toPrecision(7)}
                </Text>
              )}
            </Item>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  const { photo } = state.photoModel;
  const { region } = state.locationModel;
  const { user } = state.userModel;
  return {
    photo,
    region,
    user
  };
};
export default connect(mapStateToProps)(PhotoContentScreen);
