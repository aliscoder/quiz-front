import { GameInterface, PlayerInterface, UserInterface } from "@types";
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
    GET GAME PLAYERS
    */
    getGamePlayers: builder.query<PlayerInterface[], string>({
      query: (gameId) => ({
        url: `/games/${gameId}/players`,
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
        url: `/games/${body.gameId}/answer`,
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
  useGetGamePlayersQuery,
  useAnswerQuestionMutation,
} = clientApi;

export default clientApi;
