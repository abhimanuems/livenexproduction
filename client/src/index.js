import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Loginpage from "./components/user/Login";
import SignupPage from "./components/user/Signup";
import store from "./store";
import VideoStreamingPage from "./components/pages/VideoStreamingPage";
import SubscriptionPage from "./components/pages/SubscriptionPage";
import VerifiyOtp from "./components/user/VerifiyOtp";
import ErrorPage from "./components/user/ErrorPage";
import TicketPage from "./components/pages/TicketPage";
import Login from "./components/admin/Login";
import SharePage from "./components/pages/SharePage";
import ShimmerLoader from "./components/admin/Shimmer";
import ErrorPageAdmin from "./components/admin/ErrorPageAdmin";
const SubscriptionAdmin = lazy(() =>
  import("./components/Adminpages/subscriptionAdmin")
);
const UserPageAdmin = lazy(() =>
  import("./components/Adminpages/UserlistPage")
);
const AdminTicketPage = lazy(() =>
  import("./components/Adminpages/TicketPageAdmin")
);
const DashboardPage = lazy(() =>
  import("./components/Adminpages/DashboardPage")
);
const Homepage = lazy(() => import("./components/pages/Homepage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Loginpage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/video",
        element: <VideoStreamingPage />,
      },
      {
        path: "/pro",
        element: <SubscriptionPage />,
      },
      {
        path: "/verifyotp",
        element: <VerifiyOtp />,
      },
      {
        path: "/ticket",
        element: <TicketPage />,
      },
      {
        path: "/share",
        element: <SharePage />,
      },
    ],
  },
  {
    path: "/admins",
    element: <App />,
    errorElement: <ErrorPageAdmin />,
    children: [
      {
        path: "/admins/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/admins/login",
        element: <Login />,
      },
      {
        path: "/admins/subscription",
        element: (
          <Suspense fallback={<ShimmerLoader />}>
            <SubscriptionAdmin />
          </Suspense>
        ),
      },
      {
        path: "/admins/user",
        element: (
          <Suspense fallback={<ShimmerLoader />}>
            <UserPageAdmin />
          </Suspense>
        ),
      },
      {
        path: "/admins/ticket",
        element: (
          <Suspense fallback={<ShimmerLoader />}>
            <AdminTicketPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
