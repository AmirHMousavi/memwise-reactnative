import React, { Component } from "react";
/* import { View } from "react-native"; */
import {
  Card,
  CardItem,
  Item,
  Button,
  Label,
  Input,
  Icon,
  Text,
  View
} from "native-base";
import ProTypes from "prop-types";

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <Card>
          <CardItem>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
          </CardItem>
          <CardItem>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry />
            </Item>
          </CardItem>

          <Button bordered block info style={{ margin: 15, marginTop: 35 }}>
            <Text>Sign In</Text>
          </Button>
          <Button bordered block success style={{ margin: 15, marginTop: 0 }}>
            <Text>Signup</Text>
          </Button>
        </Card>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1
          }}
        />
        <View>
          <Card>
            <Button
              iconLeft
              block
              rounded
              primary
              large
              style={{ margin: 15, marginTop: 40 }}
              onPress={this.props.loginWithFacebook()}
            >
              <Icon active name="logo-facebook" />
              <Text>Login With Facebook</Text>
            </Button>
            <Button
              iconLeft
              block
              rounded
              danger
              large
              style={{ margin: 15, marginTop: 15 }}
              onPress={this.props.signInWithGoogleAsync()}
            >
              <Icon active name="logo-googleplus" />
              <Text>Login With Google</Text>
            </Button>
          </Card>
        </View>
      </View>
    );
  }
}

LoginForm.propTypes = {
  signInWithGoogleAsync: ProTypes.func.isRequired,
  loginWithFacebook: ProTypes.func.isRequired
};
