import { Container, Error, Loading } from "@components";
import { useAuth } from "@hooks";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  useAnswerQuestionMutation,
  useGetGamePlayersQuery,
  useGetGameQuery,
} from "@state/api/game";
import { GameRouteProp } from "@navigation/utils/types";
import GamePended from "./Components/GamePended";
import GameStarted from "./Components/GameStarted";

const Game = () => {
  const { params } = useRoute<GameRouteProp>();
  const { gameId: id } = params;
  const { data: game, isLoading, isError } = useGetGameQuery(id);
  const { data: players } = useGetGamePlayersQuery(id, {
    pollingInterval: 3000,
  });

  const [status, setStatus] = useState(game?.status);

  useEffect(() => {
    if (game) {
      setStatus(game?.status);
      let remainingTime = game.startTime - game.nowTime;
      let Timer = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime -= 1;
        } else {
          clearInterval(Timer);
          setStatus("start");
        }
      }, 1000);
    }
  }, [game]);

  return isLoading ? (
    <Loading />
  ) : isError || !game ? (
    <Error />
  ) : (
    <Container>
      {status == "before" && <GamePended game={game} />}
      {status == "start" && players && (
        <GameStarted players={players} game={game} />
      )}
      {/* {status == "after" && <GameFinished game={game} />} */}
    </Container>
  );
};

export default Game;
