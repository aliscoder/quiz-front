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
      // providesTags: ['Games']
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
      // invalidatesTags: ['Games']
    }),
  }),
});

export const {
  useRegisterUserInGameMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
} = clientApi;

export default clientApi;
