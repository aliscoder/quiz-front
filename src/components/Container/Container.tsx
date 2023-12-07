import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Icon, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React from "react";
import { useAuth } from "../../hooks";
import { Row, RowBetween } from "../Row/Row";
import Touch from "../Touch/Touch";
import { Column } from "../Column/Column";
import { TextNormal } from "../Text/Text";

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
  return (
    <RowBetween height={12} px={4} my={2}>
      <Touch>
        <TextNormal>خرید سکه</TextNormal>
      </Touch>
      <Column>
        <TextNormal>{user?.username}</TextNormal>
        <TextNormal>{user?.coin}</TextNormal>
      </Column>
    </RowBetween>
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
