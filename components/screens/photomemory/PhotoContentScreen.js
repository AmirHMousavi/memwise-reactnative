import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Body,
  Title
} from "native-base";

export default class PhotoContentScreen extends Component {
  render() {
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
            <Title>Fill Content</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate("PhotoContentScreen")
              }
            >
              <Icon name="md-arrow-round-forward" />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
