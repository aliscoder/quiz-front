import { Card } from "@components";
import { GameInterface } from "@types";
import { Text } from "native-base";
import React from "react";

type Props = {
  game: GameInterface;
};

const QuizEntranceCard = (props: Props) => {
  return (
    <Card>
      <Text>Hi</Text>
    </Card>
  );
};

export default QuizEntranceCard;
