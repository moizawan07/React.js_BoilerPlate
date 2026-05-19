
import { apiSlice } from "../..";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPasswordApi: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordApi: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginApiMutation,
  useForgotPasswordApiMutation,
  useResetPasswordApiMutation,
} = authApi;