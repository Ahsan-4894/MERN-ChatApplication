import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectRoute.jsx";
import { LayOutLoader } from "./layout/Loaders.jsx";
import axios from "axios";
import { server } from "./constants/config.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { userNotExists, userExists } from "./redux/reducers/auth.js";
import { SocketProvider } from "./socket.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const NotFounded = lazy(() => import("./pages/NotFounded.jsx"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminDashBoard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminChatManagement = lazy(() =>
  import("./pages/admin/ChatManagement.jsx")
);
const AdminUserManagement = lazy(() =>
  import("./pages/admin/UserManagement.jsx")
);
const AdminMessageManagement = lazy(() =>
  import("./pages/admin/MessageManagement.jsx")
);
const App = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data)))
      .catch((err) => dispatch(userNotExists()));
  }, []);
  return loader ? (
    <LayOutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayOutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoutes user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatID" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route element={<ProtectedRoutes user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin/">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashBoard />} />

            <Route path="user-management" element={<AdminUserManagement />} />
            <Route path="chat-management" element={<AdminChatManagement />} />
            <Route
              path="message-management"
              element={<AdminMessageManagement />}
            />
          </Route>
          <Route path="*" element={<NotFounded />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
