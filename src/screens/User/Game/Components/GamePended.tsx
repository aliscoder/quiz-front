import {
  Avatar,
  Card,
  Column,
  List,
  Row,
  RowBetween,
  TextNormal,
} from "@components";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import CountDown from "@screens/User/Components/CountDown";
import { GameInterface } from "@types";
import { Center, Icon } from "native-base";
import React from "react";

type Props = {
  game: GameInterface;
};

const GamePended = ({ game }: Props) => {
  const { user } = useAuth();
  return (
    <Column h="full" pb={5}>
      <Center h="1/2">
        <CountDown start={game.startTime} now={game.nowTime} onEnd={() => {}} />
      </Center>

      <Card h="1/2">
        <RowBetween p={2}>
          <TextNormal>{game.players.length} نفر</TextNormal>
          <TextNormal>لیست شرکت کنندگان</TextNormal>
        </RowBetween>
        <List
          style={{ maxHeight: 400 }}
          data={game.players}
          renderItem={({ item, index }) => (
            <RowBetween
              p={2}
              mt={index !== 0 ? 2 : 0}
              background={item.user._id === user._id ? "success" : "info"}
              borderRadius={5}
            >
              <Row space={2}>
                <TextNormal>{item.point}</TextNormal>
                <Icon
                  as={FontAwesome}
                  name={item.isUp ? "caret-up" : "caret-down"}
                  color={item.isUp ? "success" : "danger"}
                />
              </Row>
              <Row space={2}>
                <TextNormal>{item.user.username}</TextNormal>
                <Avatar uri={item.user.avatar?.url} size="sm" />
              </Row>
            </RowBetween>
          )}
        />
      </Card>
    </Column>
  );
};

export default GamePended;
