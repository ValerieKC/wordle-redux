import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey:string|undefined = process.env.REACT_APP_RAPIDAPI_KEY;

type GetTodayResponse = {
  today: string;  
};

const wordleApi = createApi({
  reducerPath: "wordleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordle-answers-solutions.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      if (apiKey) {
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set(
          "X-RapidAPI-Host",
          "wordle-answers-solutions.p.rapidapi.com"
        );
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getToday: builder.query<GetTodayResponse, void>({
      query: () => ({ url: "today" }),
    }),
  }),
});

export const { useGetTodayQuery } = wordleApi;
export default wordleApi