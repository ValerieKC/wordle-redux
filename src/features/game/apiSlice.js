import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const wordleApi = createApi({
  reducerPath: "wordleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordle-answers-solutions.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "539e31ce3fmshd1d6494151be240p16b833jsn7fa4246cc02f"
      );
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