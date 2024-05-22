import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Timeline from './timeline/Timeline';
import Login from './login/Login';
import PrivateRoute from './PrivateRoute';
import Friends from './friends/Friends';
import FriendRequests from './friendRequests/friendRequests';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login isLoginMode={true} />} />
        <Route path="/register" element={<Login isLoginMode={false} />} />
        <Route path="/timeline" element={<PrivateRoute element={Timeline} /> } />
        <Route path='/friends' element={<PrivateRoute element={Friends} /> } />
        <Route path='/friendRequests' element={<PrivateRoute element={FriendRequests} /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);