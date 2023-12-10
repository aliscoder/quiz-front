import { Container, Error, Loading } from "@components";
import { useAppDispatch, useModal } from "@hooks";
import React, { useEffect, useState } from "react";
import { useGameSocket } from "./GameProvider";
import { useNavigation } from "@react-navigation/core";
import { useGetGameQuery } from "@state/api/game";
import { Text } from "native-base";

const Game = ({ id }: { id: string }) => {
  const { data: game, isLoading, isError } = useGetGameQuery(id);
  const socket = useGameSocket();

  console.log(game);

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
      <Text>{game.nowTime}</Text>
    </Container>
  );
};

export default Game;
