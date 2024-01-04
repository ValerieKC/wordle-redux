import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey:string|undefined = process.env.REACT_APP_RAPIDAPI_KEY;

type GetTodayResponse = {
  word: string;  
};

const wordleApi = createApi({
  reducerPath: "wordleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordle-game-api1.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      if (apiKey) {
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set(
          "X-RapidAPI-Host",
          "wordle-game-api1.p.rapidapi.com"
        );
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getToday: builder.query<GetTodayResponse, void>({
      query: () => ({ url: "word" }),
    }),
  }),
});

export const { useGetTodayQuery } = wordleApi;
export default wordleApi