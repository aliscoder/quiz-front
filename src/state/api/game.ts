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

export const { useUpdateProfileMutation, useGetAllGamesQuery } = clientApi;

export default clientApi;
