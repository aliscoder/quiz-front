import {
  Animation,
  Column,
  Container,
  Error,
  Loading,
  Row,
  RowBetween,
  TextTiny,
} from "@components";
import { useAppDispatch, useAuth, useModal } from "@hooks";
import React, { useEffect, useState } from "react";
import { useGameSocket } from "./GameProvider";
import { useNavigation } from "@react-navigation/core";
import { useAnswerQuestionMutation, useGetGameQuery } from "@state/api/game";
import {
  Avatar,
  Center,
  FlatList,
  Icon,
  InfoIcon,
  Text,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "native-base";
import { View } from "native-base";
import { Image } from "native-base";
import CountDown from "../Components/CountDown";
import { RankAnimation } from "../../../../src/assets/animations";
import { AvatarLogo } from "@utils";
import { Platform } from "react-native";
import pallete from "src/utils/theme/pallete";

const Game = ({ id }: { id: string }) => {
  const { data: game, isLoading, isError } = useGetGameQuery(id);
  const [answerQuestion, { data: question }] = useAnswerQuestionMutation();
  const socket = useGameSocket();
  const { user } = useAuth();

  const [status, setStatus] = useState(game?.status);

  useEffect(() => {
    if (game) {
      setStatus(game?.status);
    }
  }, [game]);

  useEffect(() => {
    if (game) {
      let remainingTime = game.startTime - game.nowTime;
      setInterval(() => {
        if (remainingTime <= 0) {
          setStatus("start");
          answerQuestion({
            gameId: game._id,
            playerId: game.players.find((player) => player.user._id == user._id)
              ?._id!,
          });
        } else {
          remainingTime -= 1;
        }
      }, 1000);
    }
  }, [game]);

  // const handleConfirm = () => {
  //   if (appointment && selectedStatus) {
  //     closeModal();
  //     socket.emit("change-appt-status", { apptId: id, status: selectedStatus });
  //     dispatch(
  //       apptApi.util.updateQueryData("getAppointment", id, (draft) => {
  //         Object.assign(draft, { ...draft, status: selectedStatus });
  //       })
  //     );

  //     dispatch(
  //       barberApi.util.invalidateTags(["Schedule", "Appointments", "Pending"])
  //     );
  //   }
  // };

  // useEffect(() => {
  //   socket.on("status-changed", (newStatus) => {
  //     dispatch(
  //       apptApi.util.updateQueryData("getAppointment", id, (draft) => {
  //         Object.assign(draft, { ...draft, status: newStatus });
  //       })
  //     );

  //     dispatch(
  //       barberApi.util.invalidateTags(["Schedule", "Appointments", "Pending"])
  //     );
  //   });
  // }, [socket]);

  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container>
      {status == "before" && (
        <Center h="full">
          <CountDown
            start={game.startTime}
            now={game.nowTime}
            onEnd={() => {}}
          />
        </Center>
      )}

      {status == "after" && (
        <>
          <RowBetween>
            <Column
              space={2}
              position="absolute"
              top={360}
              right={16}
              zIndex={100}
              alignItems="center"
            >
              <Avatar
                source={{ uri: game.players[0].user.avatar?.url }}
                size="md"
              />
              <TextTiny color="secondary">
                {game.players[0].user.username}
              </TextTiny>
            </Column>

            <Column
              space={2}
              position="absolute"
              top={310}
              right={160}
              zIndex={100}
              alignItems="center"
            >
              <Avatar
                source={{ uri: game.players[1].user.avatar?.url }}
                size="md"
              />
              <TextTiny color="secondary">
                {game.players[1].user.username}
              </TextTiny>
            </Column>
            <Column
              space={2}
              position="absolute"
              top={340}
              left={16}
              zIndex={100}
              alignItems="center"
            >
              <Avatar
                source={{ uri: game.players[2].user.avatar?.url }}
                size="md"
              />
              <TextTiny color="secondary">
                {game.players[2].user.username}
              </TextTiny>
            </Column>
          </RowBetween>
          <Center h="full" position="relative">
            <Animation
              loop={false}
              // size={Platform.OS === "web" ? 800 : 400}
              size={400}
              name={RankAnimation}
            />
          </Center>
        </>
      )}

      {status == "start" && (
        <HStack w="full" h="full" justifyContent="center" space={2}>
          <Center w="80%" bg="secondary" rounded="md">
            <View>
              {/* <Avatar> {count ? count : 0}</Avatar> */}
              <InfoIcon color="yellow.500" size="xs" />
            </View>

            <View
              borderRadius={5}
              w="95%"
              minHeight={250}
              p={2}
              color="primary"
              bg="primary"
              alignItems="center"
              ml={4}
              mr={4}
            >
              <Image
                borderRadius={5}
                w="45%"
                minHeight={100}
                p={2}
                color="primary"
                ml={4}
                mr={4}
                source={require("../../../../assets/photos/Logo.png")}
                alt="Alternate Text"
              />

              <Text
                fontSize={14}
                borderRadius={5}
                w="90%"
                minHeight={85}
                p={2}
                color="primary"
                ml={4}
                mr={4}
                bg="primary"
                marginBottom={2}
              >
                {question?.id + "-"}
                {question?.body}{" "}
              </Text>
            </View>
            {/* <VStack w="90%">
            <Text
              fontSize={15}
              textAlign="center"
              borderRadius={20}
              w="90%"
              p={2}
              color="primary"
              onPress={() => answerQustion(1)}
              m={2}
              bg={
                answerOk == 1
                  ? pallete.success
                  : answerOk == 5
                  ? pallete.danger
                  : pallete.info
              }
              marginBottom={1}
            >
              {" "}
              {question.option1}
            </Text>
            <Text
              fontSize={15}
              textAlign="center"
              borderRadius={20}
              w="90%"
              p={2}
              color="primary"
              onPress={() => answerQustion(2)}
              m={2}
              bg={
                answerOk == 2
                  ? pallete.success
                  : answerOk == 6
                  ? pallete.danger
                  : pallete.info
              }
              marginBottom={1}
            >
              {" "}
              {question.option2}
            </Text>

            <Text
              fontSize={15}
              textAlign="center"
              borderRadius={20}
              w="90%"
              p={2}
              color="primary"
              onPress={() => answerQustion(3)}
              m={2}
              bg={
                answerOk == 3
                  ? pallete.success
                  : answerOk == 7
                  ? pallete.danger
                  : pallete.info
              }
              marginBottom={1}
            >
              {" "}
              {question.option3}
            </Text>
            <Text
              fontSize={15}
              textAlign="center"
              borderRadius={20}
              w="90%"
              p={2}
              color="primary"
              onPress={() => answerQustion(4)}
              m={2}
              bg={
                answerOk == 4
                  ? pallete.success
                  : answerOk == 8
                  ? pallete.danger
                  : pallete.info
              }
              marginBottom={1}
            >
              {" "}
              {question.option4}
            </Text>
          </VStack> */}
          </Center>
          <VStack
            space={1}
            alignItems="center"
            h="full"
            borderWidth={1}
            borderRadius={5}
            p={4}
            width="20%"
          >
            {/* <FlatList
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            data={userIcon}
            renderItem={({ item }) => (
              <VStack>
                <Avatar
                  size="sm"
                  style={{ border: "unset" }}
                  bg="green.505"
                  source={{
                    uri: game.user.avatar.url,
                  }}
                />
                <VStack>
                  <Text fontSize="xs">{game.user.username}</Text>
                  <Text fontSize="xs">{item.point}</Text>

                  <Text fontSize="xs">{item.isUp && "fffff"}</Text>
                </VStack>
              </VStack>
            )}
          /> */}
          </VStack>
        </HStack>
      )}
    </Container>
  );
};

export default Game;
