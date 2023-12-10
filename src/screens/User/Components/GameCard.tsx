import {
  Card,
  Column,
  Image,
  RowBetween,
  TextNormal,
  TextTitle,
  Touch,
} from "@components";
import {
  UserScreenNavigationProp,
  UserStackParamList,
} from "@navigation/utils/types";
import { useNavigation } from "@react-navigation/core";
import { GameInterface } from "@types";
import moment from "jalali-moment";
import { Avatar, Center, View } from "native-base";
import React from "react";
import AvatarGroup from "./PlayersAvatarGroup";
import PlayersAvatarGroup from "./PlayersAvatarGroup";
import { useAuth } from "@hooks";

type Props = {
  game: GameInterface;
};

const QuizEntranceCard = ({ game }: Props) => {
  const { navigate } = useNavigation<UserScreenNavigationProp>();
  const { user } = useAuth();

  function checkUserRegisteration() {
    if (game.players.map((player) => player.user._id).includes(user._id)) {
      navigate("Game", { gameId: game._id });
    } else {
    }
  }
  return (
    <Touch onPress={checkUserRegisteration}>
      <Card>
        <RowBetween>
          <Image uri={game.image} size={80} radius={50} />
          <Column alignItems="center">
            <TextTitle>{`مسابقه ${game.type} تومانی`}</TextTitle>
            <PlayersAvatarGroup players={game.players} />
          </Column>
          <RowBetween h="full" w="1/6">
            <View h="full" w={1} borderRadius={10} background="success" />
            <TextNormal>
              {moment.unix(game.startTime).format("H : mm")}
            </TextNormal>
          </RowBetween>
        </RowBetween>
      </Card>
    </Touch>
  );
};

export default QuizEntranceCard;
