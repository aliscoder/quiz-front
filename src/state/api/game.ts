import { GameInterface, UserInterface } from "@types";
import Api from ".";

const clientApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    GET ALL GAMES
    */
    getAllGames: builder.query<GameInterface[], undefined>({
      query: () => ({
        url: `/games`,
        method: "GET",
      }),
      providesTags: ["Games"],
    }),

    /*
    GET SPECIFIC GAME
    */
    getGame: builder.query<GameInterface, string>({
      query: (gameId) => ({
        url: `/games/${gameId}`,
        method: "GET",
      }),
    }),

    /*
    ANSWER QUESTION
    */
    answerQuestion: builder.mutation<
      any,
      { gameId: string; playerId: string; qId?: string; answer?: number }
    >({
      query: (body) => ({
        url: `/games/answer/${body.gameId}`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Games"],
    }),

    /*
    UPDATE USER PROFILE
    */
    registerUserInGame: builder.mutation<
      { game: GameInterface; user: UserInterface },
      { gameId: string; userId: string }
    >({
      query: (body) => ({
        url: "/games/register_game",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Games"],
    }),
  }),
});

export const {
  useRegisterUserInGameMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
  useAnswerQuestionMutation,
} = clientApi;

export default clientApi;
