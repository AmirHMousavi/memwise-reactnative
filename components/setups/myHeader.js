import React, { Component } from "react";
import { Header, Left, Button, Body, Right, Icon, Title } from "native-base";
import PropTypes from "prop-types";

export default class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button
            transparent
            onPress={this.props.onPress()}
            disabled={this.props.headerName === "LoginScreen"}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.headerName}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

MyHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  headerName: PropTypes.string.isRequired
};
