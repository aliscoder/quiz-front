import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeBottomTabOprions } from "./utils/options";
import Home from "@screens/User/Home/Home";
import { UserBottomTabParamList, UserStackParamList } from "./utils/types";
import GameProvider from "@screens/User/Game/GameProvider";

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
      <UserStack.Screen name="Game" component={GameProvider} />
    </UserStack.Navigator>
  );
};

export default UserNavigator;
