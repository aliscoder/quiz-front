import {
  Button,
  Column,
  List,
  Loading,
  RowBetween,
  TextNormal,
} from "@components";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { useAnswerQuestionMutation } from "@state/api/game";
import { GameInterface, PlayerInterface } from "@types";
import {
  Avatar,
  Center,
  Icon,
  Image,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";

type Props = {
  game: GameInterface;
  players: PlayerInterface[];
};

const GameStarted = ({ game, players }: Props) => {
  const [
    answerQuestion,
    {
      data: question,
      isSuccess: firstAnswerSuccess,
      isLoading: firstAnswerLoading,
    },
  ] = useAnswerQuestionMutation();

  const [currQuestion, setCurrQuestion] = useState<any>();

  const { user } = useAuth();

  useEffect(() => {
    answerQuestion({
      gameId: game._id,
      playerId: game.players.find((player) => player.user._id == user._id)
        ?._id!,
    });
  }, []);

  useEffect(() => {
    setCurrQuestion(question);
  }, [firstAnswerSuccess]);

  return (
    <RowBetween space={3}>
      <View
        w="90%"
        bg="red.500"
        h="full"
        justifyContent="center"
        alignItems="center"
      >
        {currQuestion && (
          <Column space={2} px={5}>
            <TextNormal color="secondary">{currQuestion.body}</TextNormal>
            {[1, 2, 3, 4].map((option) => (
              <Button
                title={currQuestion[`option${option}`]}
                scheme="primary"
                mt={3}
                py={3}
                w="full"
                onPress={() =>
                  answerQuestion({
                    gameId: game._id,
                    playerId: game.players.find(
                      (player) => player.user._id == user._id
                    )?._id!,
                    answer: option,
                    qId: currQuestion._id,
                  })
                }
              />
            ))}
          </Column>
        )}
      </View>

      <List
        showsVerticalScrollIndicator={false}
        data={players}
        renderItem={({ item }) => (
          <Avatar
            size="sm"
            bg="green.505"
            source={{
              uri: item.user.avatar?.url,
            }}
          />
          // <VStack>
          //   <Text fontSize="xs">{item.user.username}</Text>
          //   <Text fontSize="xs">{item.point}</Text>
          //   <Icon
          //     as={FontAwesome}
          //     color={item.isUp ? "success" : "danger"}
          //     name={item.isUp ? "caret-up" : "caret-down"}
          //   />
          // </VStack>
        )}
      />
    </RowBetween>
  );
};

export default GameStarted;
