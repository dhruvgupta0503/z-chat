import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import axios from 'axios';
import { server } from './constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists,userExists } from './redux/reducers/auth';
import {Toaster} from "react-hot-toast"

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Groups = lazy(() => import('./pages/Groups'));
const Chat = lazy(() => import('./pages/Chat'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));
const MessagesManagement = lazy(() => import('./pages/admin/MessageManagement'));

const App = () => {
  const [user, setUser] = useState(null); // Local state for user authentication

  // Redux state management
  const authUser = useSelector(state => state.auth.user); // Assuming your auth slice has a 'user' state
  const dispatch = useDispatch();
  const {loader} = useSelector(state=>state.auth);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  // Example function to simulate login/logout
  const handleLogin = () => {
    // Simulate successful login
    setUser({ username: 'exampleUser' }); // Update local state upon login
    // You might also dispatch an action to update Redux state here
  };

  const handleLogout = () => {
    // Simulate logout
    setUser(null); // Clear local user state upon logout
    // You might also dispatch an action to update Redux state here
  };

  return loader ?(
    <LayoutLoader/>
  ) : (
    
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* ProtectRoute for home page, redirect to /login if not authenticated */}
          <Route path="/" element={<ProtectRoute user={authUser || user} redirect="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessagesManagement />} />
          {/* Route for Login page */}
          <Route
            path="/login"
            element={
              authUser || user ? (
                <Navigate to="/home" replace /> // Redirect if already logged in
              ) : (
                <Login onLogin={handleLogin} /> // Render login page
              )
            }
          />
        </Routes>
      </Suspense>
          <Toaster position='bottom-center'/>

    </Router>
  );
};

export default App;
