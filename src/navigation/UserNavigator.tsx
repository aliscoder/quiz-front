import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { usePlatform } from "@hooks";
import { Box } from "native-base";
import { Dimensions } from "react-native";
import { HomeBottomTabOprions, HomeGameTopTabOptions } from "./utils/options";
import { useGetAllGamesQuery } from "@state/api/game";
import Home from "@screens/User/Home/Home";
import { UserBottomTabParamList, UserStackParamList } from "./utils/types";

const Test = () => {
  return <></>;
};

const UserStack = createNativeStackNavigator<UserStackParamList>();
const BottomTab = createBottomTabNavigator<UserBottomTabParamList>();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={HomeBottomTabOprions}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Profile" component={Test} />
    </BottomTab.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="Main" component={BottomTabStack} />
      {/* <UserStack.Screen name="Quiz" component={QuizProvider} /> */}
    </UserStack.Navigator>
  );
};

export default UserNavigator;
