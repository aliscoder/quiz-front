import {
  Button,
  Column,
  Image,
  List,
  Row,
  RowBetween,
  TextNormal,
  TextTiny,
} from "@components";
import { useAuth } from "@hooks";
import { useAnswerQuestionMutation } from "@state/api/game";
import { GameInterface, PlayerInterface } from "@types";
import { Avatar, Center, Icon, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import isCorrect from "../checkCorrectAnswer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesome } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";

type Props = {
  game: GameInterface;
  players: PlayerInterface[];
  changeGameStatus: any
};

const GameStarted = ({ game, players, changeGameStatus }: Props) => {
  const [
    answerQuestion,
    {
      data: question,
      isSuccess: firstAnswerSuccess,
      isLoading: firstAnswerLoading,
    },
  ] = useAnswerQuestionMutation();

  const [currQuestion, setCurrQuestion] = useState<any>();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const { user } = useAuth();
  const userPlayer = game.players.find((player) => player.user._id == user._id);

  useEffect(() => {
    answerQuestion({
      gameId: game._id,
      playerId: userPlayer?._id!,
    });
  }, []);

  useEffect(() => {
    if (firstAnswerSuccess) {
      setCorrect(0);
      setWrong(0);
      setCurrQuestion(question);
    }
  }, [firstAnswerSuccess]);

  return (
    <RowBetween h="full" pb={3}>
      <Column h="full" w="85%" bg="info" borderRadius={10}>
        <RowBetween p={5}>
     
           
   
        
          <Center
            borderRadius="full"
            borderWidth={3}
            borderColor="border.sharp"
            w={50}
            h={50}
          >
            <TextNormal>{userPlayer?.point}</TextNormal>
          </Center>
          <CircularProgress
           
           value={0}
           radius={50}
           maxValue={500}
           initialValue={game.endTime - game.nowTime}
           progressValueColor={'#fff'}
           progressValueStyle={{fontSize: 20, fontFamily: 'Yekan'}}
           activeStrokeWidth={5}
           inActiveStrokeWidth={15}
           
           duration={(game.endTime - game.nowTime) * 1000}
           onAnimationComplete={changeGameStatus}
           progressFormatter={(value: number) => {
             'worklet';
       
             const seconds = Math.floor(value % 60);
             const minutes = Math.floor((value / 60) % 60);

 
             return `${minutes < 10 ? '0'+minutes : minutes} : ${seconds < 10 ? '0'+seconds : seconds}`; // 2 decimal places
           }}
         />
          <Center
            borderRadius="full"
            borderWidth={3}
            borderColor="border.sharp"
            w={50}
            h={50}
          >
            {currQuestion && (
              <TextNormal>
                {game.questions.findIndex((q) => q === currQuestion._id) + 1}
              </TextNormal>
            )}
          </Center>
        </RowBetween>
        {currQuestion && (
          <Column space={2} px={5} justifyContent="center" alignItems="center">
            <Image radius={50} uri={game.image} size={150} />
            <TextNormal color="primary">{currQuestion.body} </TextNormal>
            {[1, 2, 3, 4].map((option) => (
              <Button
                borderRadius={15}
                title={currQuestion[`option${option}`]}
                disabled={firstAnswerLoading}
                scheme={
                  correct === option
                    ? "success"
                    : wrong === option
                    ? "danger"
                    : "primary"
                }
                mt={3}
                py={3}
                w="full"
                onPress={() => {
                  if (isCorrect(currQuestion.questionId, option)) {
                    setWrong(0);
                    setCorrect(option);
                  } else {
                    setCorrect(0);
                    setWrong(option);
                  }

                  answerQuestion({
                    gameId: game._id,
                    playerId: game.players.find(
                      (player) => player.user._id == user._id
                    )?._id!,
                    answer: option,
                    qId: currQuestion._id,
                  });
                }}
              />
            ))}
          </Column>
        )}
      </Column>

      <View w="10%" h="full">
        <List
          showsVerticalScrollIndicator={false}
          data={players}
          renderItem={({ item, index }) => (
            <Column mt={index !== 0 ? 3 : 0} alignItems="center">
              <Avatar
                size="sm"
                bg="green.505"
                source={{
                  uri: item.user.avatar?.url,
                }}
              />
              <TextTiny fontSize="xs">{item.user.username}</TextTiny>
              <Row space={2}>
                <TextTiny>{item.point}</TextTiny>
                <Icon
                  as={FontAwesome}
                  color={item.isUp ? "success" : "danger"}
                  name={item.isUp ? "caret-up" : "caret-down"}
                />
              </Row>
            </Column>
          )}
        />
      </View>
    </RowBetween>
  );
};

export default GameStarted;
