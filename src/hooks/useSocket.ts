import { EXPO_PUBLIC_API_URL } from "@utils";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    //@ts-ignore
    const newSocket = io(EXPO_PUBLIC_API_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
