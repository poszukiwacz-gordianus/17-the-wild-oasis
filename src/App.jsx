import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Styles
import GlobalStyles from "./styles/GlobalStyles";

//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Registration = lazy(() => import("./pages/Registration"));
const NewReservation = lazy(() => import("./pages/NewReservation"));
const Messages = lazy(() => import("./pages/Messages"));

import ProtectedRoute from "./ui/ProtectedRoute";
import AdminOnly from "./ui/AdminOnly";
import AppLayout from "./ui/AppLayout";
import Spinner from "./ui/Spinner";

import { DarkModeProvider } from "./context/DarkModeContext";
import { MessageProvider } from "./context/MessageContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
          <ReactQueryDevtools />
          <GlobalStyles />
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route index element={<Navigate replace to="dashboard" />} />

                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />

                <Route
                  element={
                    <ProtectedRoute>
                      <MessageProvider>
                        <AppLayout />
                      </MessageProvider>
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="registration" element={<Registration />} />
                  <Route path="new-reservation" element={<NewReservation />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="booking/:bookingId" element={<Booking />} />
                  <Route path="checkin/:bookingId" element={<Checkin />} />
                  <Route path="cabins" element={<Cabins />} />
                  <Route
                    path="users"
                    element={
                      <AdminOnly>
                        <Users />
                      </AdminOnly>
                    }
                  />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="account" element={<Account />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </StyleSheetManager>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
