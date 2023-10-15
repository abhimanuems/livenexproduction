import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider, useSelector } from "react-redux";
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

function AppRouter() {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const { userInfo } = useSelector((state) => state.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: userInfo ? <Homepage /> : <Loginpage />,
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
          element: userInfo ? <VideoStreamingPage /> : <Loginpage />,
        },
        {
          path: "/pro",
          element: userInfo ? <SubscriptionPage /> : <Loginpage />,
        },
        {
          path: "/verifyotp",
          element: userInfo ? <VerifiyOtp /> : <Loginpage />,
        },
        {
          path: "/ticket",
          element: userInfo ? <TicketPage /> : <Loginpage />,
        },
        {
          path: "/share",
          element: userInfo ? <SharePage /> : <Loginpage />,
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
          element: adminInfo ? <DashboardPage /> : <Login />,
        },
        {
          path: "/admins/login",
          element: <Login />,
        },
        {
          path: "/admins/subscription",
          element: adminInfo ? (
            <Suspense fallback={<div>Loading Subscription Admin...</div>}>
              <SubscriptionAdmin />
            </Suspense>
          ) : (
            <Login />
          ),
        },
        {
          path: "/admins/user",
          element: adminInfo ? (
            <Suspense fallback={<div>Loading Subscription Admin...</div>}>
              <UserPageAdmin />
            </Suspense>
          ) : (
            <Login />
          ),
        },
        {
          path: "/admins/ticket",
          element: adminInfo ? (
            <Suspense fallback={<div>Loading Subscription Admin...</div>}>
              <AdminTicketPage />
            </Suspense>
          ) : (
            <Login />
          ),
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
