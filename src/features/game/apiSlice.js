import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

const wordleApi = createApi({
  reducerPath: "wordleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordle-answers-solutions.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", apiKey);
      headers.set("X-RapidAPI-Host", "wordle-answers-solutions.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getToday: builder.query({
      query: ()=>({ url: "today" }),
    }),
  }),
});

export const { useGetTodayQuery } = wordleApi;
export default wordleApi