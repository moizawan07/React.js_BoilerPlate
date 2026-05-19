import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError, 
} from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { logout } from "../slices/authSlice";


let baseUrl = "http://localhost:3000/api"; // Default to localhost for development



const baseQuery = fetchBaseQuery({
  baseUrl,
  timeout: 10000,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      toast.error("Unauthorized. Please login again.");
      api.dispatch(logout());
      console.error("Unauthorized access:", result.error);
    } else if (result.error.status === "TIMEOUT_ERROR") {
      console.error("Request timed out:", result.error);
    } else if (result.error.status === "FETCH_ERROR") {
      console.error("Network error:", result.error);
    }
  }
  return result;
};

export const apiSlice = createApi({
  tagTypes: [],
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
