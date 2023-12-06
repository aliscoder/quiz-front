import { List } from "@components";
import { usePlatform } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useGetAllGamesQuery } from "@state/api/game";
import { Box } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import QuizEntranceCard from "../Components/QuizEntranceCard";

const HomeTopTab = createMaterialTopTabNavigator();

const AllGames = () => {
  const { data: games, isLoading, isError } = useGetAllGamesQuery(undefined);
  return (
    <List
      renderItem={({ item }) => <QuizEntranceCard game={item} />}
      data={games}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

const MyGames = () => {
  const { data: games, isLoading, isError } = useGetAllGamesQuery(undefined);
  return (
    <List
      renderItem={({ item }) => <QuizEntranceCard game={item} />}
      data={games}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

const Home = () => {
  const { isIOS } = usePlatform();

  return (
    <Box flex={1} safeAreaTop={!isIOS && 0}>
      <HomeTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="All"
        screenOptions={HomeGameTopTabOptions}
      >
        <HomeTopTab.Screen
          name="All"
          options={{ title: "همه مسابقه ها" }}
          component={AllGames}
        />
        <HomeTopTab.Screen
          options={{ title: "مسابقه های من" }}
          name="Mine"
          component={MyGames}
        />
      </HomeTopTab.Navigator>
    </Box>
  );
};

export default Home;
