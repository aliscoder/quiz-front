import { Animation, Avatar, Column, RowBetween, TextTiny } from "@components";
import { GameInterface } from "@types";
import { Center, View } from "native-base";
import React from "react";
import { RankAnimation } from "src/assets/animations";

type Props = {
  game: GameInterface;
};

const GameFinished = ({ game }: Props) => {
  return (
    <View position="relative" h="full">
      <RowBetween>
        <Column
          space={2}
          position="absolute"
          top={360}
          right={16}
          zIndex={100}
          alignItems="center"
        >
          <Avatar uri={game.players[0].user.avatar?.url} size="md" />
          <TextTiny color="secondary">{game.players[0].user.username}</TextTiny>
        </Column>

        <Column
          space={2}
          position="absolute"
          top={310}
          right={160}
          zIndex={100}
          alignItems="center"
        >
          <Avatar uri={game.players[1].user.avatar?.url} size="md" />
          <TextTiny color="secondary">{game.players[1].user.username}</TextTiny>
        </Column>
        <Column
          space={2}
          position="absolute"
          top={340}
          left={16}
          zIndex={100}
          alignItems="center"
        >
          <Avatar uri={game.players[2].user.avatar?.url} size="md" />
          <TextTiny color="secondary">{game.players[2].user.username}</TextTiny>
        </Column>
      </RowBetween>
      <Center>
        <Animation
          loop={false}
          // size={Platform.OS === "web" ? 800 : 400}
          size={400}
          name={RankAnimation}
        />
      </Center>
    </View>
  );
};

export default GameFinished;
