import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type GuestStackParamList = {
  Phone: undefined;
  Register: {
    phone: string;
  };
  Login: {
    phone: string;
  };
};

export type GuestScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList>;
export type RegisterScreenRouteProp = RouteProp<GuestStackParamList, "Register">;
export type LoginScreenRouteProp = RouteProp<GuestStackParamList, "Login">;

export type UserBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type UserStackParamList = {
  Main: UserBottomTabParamList;
  Quiz: {
    quizId: string;
  };
};

export type UserScreenNavigationProp = NativeStackNavigationProp<UserStackParamList>;
export type UserBottomTabNavigationProp = NativeStackNavigationProp<UserBottomTabParamList>;
export type QuizRouteProp = RouteProp<UserStackParamList, "Quiz">;
export type UserBottomTabRouteProp = RouteProp<UserBottomTabParamList>;
