import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";
import styles from "./styles";

const drawerCover = require("../../assets/sidebarCover.png");
const drawerImage = require("../../assets/react-native.png");

const datas = [
  {
    name: "MapScreen",
    route: "MapScreen",
    icon: "map",
    bg: "#C5F442"
  },
  {
    name: "ProfileScreen",
    route: "ProfileScreen",
    icon: "ios-person",
    bg: "#C5F442"
  }
];
class SideBar extends Component {
  render() {
    const { user } = this.props.userModel;
    /* console.log("formeSideBar: ", user); */
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          {user ? (
            <Thumbnail
              large
              style={styles.drawerImage}
              source={{ uri: user.photoURL }}
            />
          ) : (
            <Thumbnail large style={styles.drawerImage} source={drawerImage} />
          )}

          {user ? (
            <Text style={styles.drawerUserName}>{user.displayName}</Text>
          ) : (
            <Text>no user</Text>
          )}

          <List
            dataArray={datas}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
                {data.types && (
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text style={styles.badgeText}>{`${
                        data.types
                      } Types`}</Text>
                    </Badge>
                  </Right>
                )}
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({ userModel }) => ({ userModel }))(SideBar);
