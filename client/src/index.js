import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Loginpage from "./components/user/Login";
import SignupPage from "./components/user/Signup";
import store from './store';
import VideoStreamingPage from "./components/pages/VideoStreamingPage";
import SubscriptionPage from "./components/pages/SubscriptionPage";
import VerifiyOtp from "./components/user/VerifiyOtp";
import ErrorPage from "./components/user/ErrorPage";
import TicketPage from "./components/pages/TicketPage";
import Login from "./components/admin/Login"
import SharePage from "./components/pages/SharePage";
const SubscriptionAdmin = lazy(() =>
  import("./components/Adminpages/subscriptionAdmin")
);
const UserPageAdmin = lazy(()=>import("./components/Adminpages/UserlistPage"));
const AdminTicketPage = lazy(()=>import("./components/Adminpages/TicketPageAdmin"))
const DashboardPage = lazy(()=>import("./components/Adminpages/DashboardPage"))
const Homepage = lazy(() => import("./components/pages/Homepage"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
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
    path: "/admin",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/subscription",
        element: (
          <Suspense fallback={<div>Loading Subscription Admin...</div>}>
            <SubscriptionAdmin />
          </Suspense>
        ),
      },
      {
        path: "/admin/user",
        element: (
          <Suspense fallback={<div>Loading Subscription Admin...</div>}>
            <UserPageAdmin />
          </Suspense>
        ),
      },
      {
        path: "/admin/ticket",
        element: (
          <Suspense fallback={<div>Loading Subscription Admin...</div>}>
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
