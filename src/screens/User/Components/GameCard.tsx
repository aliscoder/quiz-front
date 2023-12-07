import {
  Card,
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
import { View } from "native-base";
import React from "react";

type Props = {
  game: GameInterface;
};

const QuizEntranceCard = ({ game }: Props) => {
  const { navigate } = useNavigation<UserScreenNavigationProp>();
  return (
    <Touch onPress={() => navigate("Game", { gameId: game._id })}>
      <Card>
        <RowBetween>
          <Image uri={game.image} size={80} radius={50} />
          <TextTitle>{`مسابقه ${game.type} تومانی`}</TextTitle>
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
