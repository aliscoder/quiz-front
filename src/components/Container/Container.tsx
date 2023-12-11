import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Icon, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React from "react";
import { useAuth } from "../../hooks";
import { Row, RowBetween } from "../Row/Row";
import Touch from "../Touch/Touch";
import { Column } from "../Column/Column";
import { TextNormal } from "../Text/Text";
import Animation from "../Animation/Animation";
import { CoinAnimation } from "../../../src/assets/animations";
import Avatar from "../Avatar/Avatar";

interface ContainerProps extends IViewProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  isInSafeArea?: boolean | number;
  headerComponent?: React.ReactNode;
  hasAvatar?: boolean;
  headerLeftElement?: React.ReactNode;
  headerRightElement?: React.ReactNode;
  rightIconComponent?: React.ReactNode;
  bottomPadded?: boolean;
  headerTitle?: string;
  bodyPadded?: boolean;
}

const MainHeader = () => {
  const { user } = useAuth();
  console.log(user);
  const add = 50000;
  const name = "alireza";
  return (
    <Column>
      <RowBetween
        mx={2}
        borderRadius={5}
        height={12}
        px={4}
        my={2}
        bg="#245a8f"
      >
        <Touch>
          <Row bg="light.500" borderRadius={15} pr={2} h={8}>
            <Animation size={40} name={CoinAnimation} />
            <TextNormal mt={1}>{add.toLocaleString()}</TextNormal>
            <Icon
              ml="4"
              as={FontAwesome5}
              name="plus-square"
              size={15}
              color="#ffd862"
            />
          </Row>
        </Touch>
        <Row space={2}>
          <TextNormal>{name}</TextNormal>
          <Avatar uri={user?.avatar.url} size="sm" />
        </Row>
      </RowBetween>
      <View>{/* BANNER */}</View>
    </Column>
  );
};

const Container: React.FC<ContainerProps> = ({
  children,
  hasHeader = true,
  bottomPadded = false,
  isInSafeArea = true,
  bodyPadded = true,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Box
      background="primary"
      pb={bottomPadded ? 20 : 0}
      safeArea={isInSafeArea}
      flex={1}
    >
      {user && hasHeader && <MainHeader />}

      <View flex={1} px={bodyPadded ? 2 : 0} {...rest}>
        {children}
      </View>
    </Box>
  );
};

export default Container;
