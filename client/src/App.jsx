import React, { Suspense, lazy } from 'react';
import {  Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import MessageManagement from './pages/admin/MessageManagement';





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
 

  return (
    
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
        <Route path="/" element={<ProtectRoute user={user} redirect="/login" />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/admin" element={<AdminLogin/>}/>
        {/* </Route> */}
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/users-management' element={<UserManagement/>}/>
        <Route path='/admin/chats-management' element={<ChatManagement/>}/>
        <Route path='/admin/messages' element={<MessagesManagement/>}/>


        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        
      </Routes>
      </Suspense>
 
  );
};

export default App;
