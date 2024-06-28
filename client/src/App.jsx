import React, { Suspense, lazy } from 'react';
import {  Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import useFetch from 'use-fetch';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from 'react-hot-toast';
import { server } from './constants/config';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat'));
const Groups = lazy(() => import('./pages/Groups'));
// const NotFound = lazy(() => import('./pages/NotFound'));



const AdminLogin=lazy(()=>import('./pages/admin/AdminLogin'));
const Dashboard=lazy(()=>import('./pages/admin/Dashboard'));
const UserManagement=lazy(()=>import('./pages/admin/UserManagement'));
const ChatManagement=lazy(()=>import('./pages/admin/ChatManagement'));
const MessagesManagement=lazy(()=>import('./pages/admin/MessageManagement'))




let user = true; 
const App = () => {

  const {user,loader}=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const { data, error, loading } = useFetch(`${server}/api/v1/user/me`, {
    method: 'GET',
    withCredentials: true,
  });

  useEffect(() => {
    if (data) {
      dispatch(userExists(data.user));
    } else if (error) {
      dispatch(userNotExists());
    }
  }, [data, error, dispatch]);

  return   (
    <>
      {loading ? (
        <LayoutLoader />
      ) : (
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route path="/" element={<ProtectRoute user={data?.user} redirect="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users-management" element={<UserManagement />} />
            <Route path="/admin/chats-management" element={<ChatManagement />} />
            <Route path="/admin/messages" element={<MessagesManagement />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
