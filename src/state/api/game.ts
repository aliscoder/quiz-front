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
    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/client/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetAllGamesQuery,
  useGetGameQuery,
} = clientApi;

export default clientApi;
