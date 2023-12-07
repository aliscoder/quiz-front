import { useRoute } from "@react-navigation/core";
import { createContext, useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import Game from "./Game";
import { GameRouteProp } from "@navigation/utils/types";

export const socketContext = createContext<Socket>({} as Socket);

const GameProvider = () => {
  const { params } = useRoute<GameRouteProp>();
  const { gameId } = params;

  const socket = io("https://quiz.iran.liara.run");

  useEffect(() => {
    socket.emit("join-room", { room: gameId });
    return () => {
      socket.emit("leave-room", { room: gameId });
      socket.disconnect();
    };
  }, [socket]);

  return (
    <socketContext.Provider value={socket}>
      <Game id={gameId} />
    </socketContext.Provider>
  );
};

export const useGameSocket = () => {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export default GameProvider;
