import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "post",
        body: data,
      }),
    }),
    subscriptionList: builder.mutation({
      query: () => ({
        url: "/admin/subscription",
        method: "get",
      }),
    }),
    userslist: builder.mutation({
      query: () => ({
        url: "/admin/users",
        method: "get",
      }),
    }),
    tickets: builder.mutation({
      query: () => ({
        url: "/admin/tickets",
        method: "get",
      }),
    }),
    ticketReply: builder.mutation({
      query: (data) => ({
        url: "/admin/ticketreply",
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "get",
      }),
    }),
  }),
});

export const {useLoginAdminMutation,useSubscriptionListMutation,useLogoutMutation,useUserslistMutation,useTicketsMutation,useTicketReplyMutation} = adminApiSlice