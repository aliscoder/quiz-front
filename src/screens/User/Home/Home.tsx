import { Container, List } from "@components";
import { useAuth } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useGetAllGamesQuery } from "@state/api/game";
import React from "react";
import { Dimensions } from "react-native";
import GameCard from "../Components/GameCard";

const HomeTopTab = createMaterialTopTabNavigator();

const AllGames = () => {
  const { data: games, isError, isLoading } = useGetAllGamesQuery(undefined);
  return (
    <List
      renderItem={({ item }) => <GameCard game={item} />}
      data={games}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

const MyGames = () => {
  const { data: games, isError, isLoading } = useGetAllGamesQuery(undefined);
  const { user } = useAuth();
  return (
    <List
      renderItem={({ item }) => <GameCard game={item} />}
      data={games?.filter((game) =>
        game.players.map((item) => item.user._id).includes(user._id)
      )}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

const Home = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default Home;
