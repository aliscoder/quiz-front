import { Container, List, TextTitle } from "@components";
import { useAuth } from "@hooks";
import { HomeGameTopTabOptions } from "@navigation/utils/options";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useGetAllGamesQuery } from "@state/api/game";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import GameCard from "../Components/GameCard";
import moment from "jalali-moment";
import { Center, Spinner } from "native-base";

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
  const { data: games, isLoading } = useGetAllGamesQuery(undefined);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (games) {
      setTime(games[0].nowTime);
    }
  }, [games]);

  useEffect(() => {
    let Timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    () => {
      clearInterval(Timer);
    };
  }, []);

  return (
    <Container>
      <Center>
        {isLoading ? (
          <Spinner color="snow" size="sm" />
        ) : (
          <TextTitle>{moment.unix(time).format("H : mm : ss")}</TextTitle>
        )}
      </Center>
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
