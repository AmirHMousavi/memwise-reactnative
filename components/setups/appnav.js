import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";

import MapScreen from "../screens/map/map";
import SideBar from "../sidebar/sidebar";
import ProfileScreen from "../screens/profile/profile";
import CameraScreen from "../screens/photomemory/cameraScreen";
import PhotoContentScreen from "../screens/photomemory/PhotoContentScreen";
import MemoryList from "../screens/memorylist/MemoryList";

const AppDrawer = DrawerNavigator(
  {
    MapScreen: { screen: MapScreen },
    ProfileScreen: { screen: ProfileScreen },
    CameraScreen: { screen: CameraScreen },
    PhotoContentScreen: { screen: PhotoContentScreen },
    MemoryList: { screen: MemoryList }
  },
  {
    initialRouteName: "MapScreen",
    contentOptions: {
      activeTintColor: "#3F7FBF",
      inactiveTintColor: "#4A6681"
    },

    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    AppDrawer: { screen: AppDrawer }
  },
  {
    initialRouteName: "AppDrawer",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <AppNavigator />
  </Root>
);
