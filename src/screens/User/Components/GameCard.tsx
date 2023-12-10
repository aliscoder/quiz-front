import {
  Card,
  Column,
  ConfirmationModal,
  Image,
  RowBetween,
  TextNormal,
  TextTitle,
  Touch,
} from "@components";
import {
  UserScreenNavigationProp,
  UserStackParamList,
} from "@navigation/utils/types";
import { useNavigation } from "@react-navigation/core";
import { GameInterface } from "@types";
import moment from "jalali-moment";
import { AlertDialog, Avatar, Box, Button, Center, Text, View, useToast } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import AvatarGroup from "./PlayersAvatarGroup";
import PlayersAvatarGroup from "./PlayersAvatarGroup";
import { useAuth, useModal } from "@hooks";
import { HStack } from "native-base";
import { useRegisterUserInGameMutation } from "@state/api/game";

type Props = {
  game: GameInterface;
};

const QuizEntranceCard = ({ game }: Props) => {
  const { navigate } = useNavigation<UserScreenNavigationProp>();
  const [registerUser, { isLoading: registerloading, isError: registerError, isSuccess }] =
    useRegisterUserInGameMutation();
  const { user } = useAuth();
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  function checkUserRegisteration() {
    if (game.players.map((player) => player.user._id).includes(user._id)) {
      navigate("Game", { gameId: game._id });
    } else {

      setIsOpen(true)
      
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.show({
      placement: "top",
      size:"lg",
  render: () => {
      return <Box bg="emerald.500" px="4"  fontSize="md" py="4"  rounded="md" mb={8}>
              ثبت نام با موفقیت انجام شد
            </Box>;
    }
})
    }
    
  }, [isSuccess])
  return (
    <>
    <Touch onPress={checkUserRegisteration}>
      <Card>
        <RowBetween>
          <Image uri={game.image} size={80} radius={50} />
          <Column alignItems="center">
            <TextTitle>{`مسابقه ${game.type} تومانی`}</TextTitle>
            <PlayersAvatarGroup players={game.players} />
          </Column>
          <RowBetween h="full" w="1/6">
            <View h="full" w={1} borderRadius={10} background="success" />
            <TextNormal>
              {moment.unix(game.startTime).format("H : mm")}
            </TextNormal>
          </RowBetween>
        </RowBetween>
      </Card>
      </Touch>
      
      <AlertDialog leastDestructiveRef={cancelRef}  isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AlertDialog.Content backgroundColor='primary'>
          {/* <AlertDialog.CloseButton /> */}
               <AlertDialog.Header backgroundColor='primary' alignItems="center" textAlign="center" >
                   <HStack space={3}>
               <Avatar size='xs'  source={{
                   uri: game.image
                }} />
                <Text fontSize={17} fontWeight='600'>ثبت نام در مسابقه</Text>
                </HStack>
                   
               </AlertDialog.Header>
          <AlertDialog.Body backgroundColor='primary' alignItems="end">
                   <HStack>
                       <Text fontSize={17} > {game.type.toLocaleString()} سکه</Text>
                       <Text fontSize={17}>ورودی مسابقه : </Text>
                    </HStack>
                   <HStack>
                       <Text fontSize={17}>{ game.players.length} نفر</Text>
                       <Text fontSize={17}>شرکت کنندگان تا این لحظه : </Text>
                    </HStack>
                   <HStack>
                       <Text fontWeight='600' color='danger' fontSize={17}>{Math.round((game.players.length* game.type) * 0.7).toLocaleString()} سکه </Text>
                       <Text fontWeight='600' fontSize={17}>جایزه نفر اول  : </Text>
                    </HStack>
          </AlertDialog.Body>
          <AlertDialog.Footer backgroundColor='primary'>
            <Button.Group space={2}>
              <Button variant="unstyled" w="50" backgroundColor= 'warning' onPress={() => setIsOpen(false)} ref={cancelRef} >
                انصراف
              </Button>
              <Button isLoading={registerloading} w="50" backgroundColor='success' onPress={() =>
              {
                
                registerUser({ gameId: game._id, userId: user._id });
                game.players.push({_id: user._id , isUp: false, point: 0, user : {_id: user._id}}) 
                setIsOpen(false)
                }
              }>
                تایید
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
       </AlertDialog>
    </>
    
  );
};

export default QuizEntranceCard;
