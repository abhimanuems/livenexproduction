import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "post",
        body: data,
      }),
    }),
    googleAuth: builder.mutation({
      query: () => ({
        url: "auth/google",
        method: "get",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "post",
        body: data,
      }),
    }),
    otp: builder.mutation({
      query: (data) => ({
        url: "auth/otp",
        method: "post",
        body: data,
      }),
    }),
    razporpay: builder.mutation({
      query: () => ({
        url: "users/orders",
        method: "get",
      }),
    }),
    facebookAccessToken: builder.mutation({
      query: (data) => ({
        url: "users/fbtoken",
        method: "post",
        body: data,
      }),
    }),
    razporPaySuccess: builder.mutation({
      query: (data) => ({
        url: "users/success",
        method: "post",
        body: data,
      }),
    }),

    facebookGetComments: builder.mutation({
      query: () => ({
        url: "users/fbcomments",
        method: "get",
      }),
    }),
    youtubeComments: builder.mutation({
      query: () => ({
        url: "users/youtubecomments",
        method: "get",
      }),
    }),
    postYTComment: builder.mutation({
      query: (data) => ({
        url: "users/youtubecomments",
        method: "post",
        body: data,
      }),
    }),
    rtmpUrlFB: builder.mutation({
      query: () => ({
        url: "users/rtmpFB",
        method: "get",
      }),
    }),
    rtmpUrlYoutube: builder.mutation({
      query: () => ({
        url: "users/rtmpyoutube",
      }),
      method: "get",
    }),
    subscription: builder.mutation({
      query: () => ({
        url: "users/subscription",
        method: "get",
      }),
    }),
    youtubeToken: builder.mutation({
      query: (data) => ({
        url: "users/youtubeaccesstoken",
        method: "post",
        body: data,
      }),
    }),
    YTviewCount: builder.mutation({
      query: () => ({
        url: "users/YTviewcount",
        method: "get",
      }),
    }),
    FBviewCount: builder.mutation({
      query: () => ({
        url: "users/fbviewcount",
        method: "get",
      }),
    }),
    deleteRTMPURLS: builder.mutation({
      query: () => ({
        url: "users/deleteRTMPURLS",
        method: "get",
      }),
    }),
    ticket: builder.mutation({
      query: (data) => ({
        url: "users/tickets",
        method: "post",
        body: data,
      }),
    }),
    ticketData: builder.mutation({
      query: () => ({
        url: "users/tickets",
        method: "get",
      }),
    }),
    getPastStreams : builder.mutation({
      query:()=>({
        url :"users/streamdetails",
        method: "get"
      })
    }),
    streamDetails: builder.mutation({
      query: (data) => ({
        url: "users/streamdetails",
        method: "post",
        body:data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "get",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleAuthMutation,
  useSignupMutation,
  useLogoutMutation,
  useOtpMutation,
  useRazporpayMutation,
  useRazporPaySuccessMutation,
  useFacebookAccessTokenMutation,
  useRtmpUrlFBMutation,
  useRtmpUrlYoutubeMutation,
  useSubscriptionMutation,
  useFacebookGetCommentsMutation,
  useYoutubeTokenMutation,
  useYoutubeCommentsMutation,
  usePostYTCommentMutation,
  useYTviewCountMutation,
  useFBviewCountMutation,
  useDeleteRTMPURLSMutation,
  useTicketMutation,
  useTicketDataMutation,
  useStreamDetailsMutation,
  useGetPastStreamsMutation

} = userApiSlice;