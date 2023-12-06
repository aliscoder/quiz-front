export interface UserInterface {
  _id: string;
  phone: string;
  point: number;
  avatar: string;
  username: string;
}

export interface GameInterface {
  _id: string;
}

export type AuthReturnType = {
  user: UserInterface;
  token: string;
};

export type DecodedTokenType = {
  userId: string;
  iat: number;
};
