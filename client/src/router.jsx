 import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import PublicRoute from './components/PublicRoute/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './components/HomePage/HomePage';
import Profile from './components/Profile';
import Search from './components/Search';
import AddPost from './components/AddPost';
import NotFound from './components/NotFound';
import Settings from './components/Settings';
import Test from './components/Test';
import Layout from './layout';
import Followers from './components/Followers';
import Follows from './components/Follows';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />
        <Route path="search/" element={<ProtectedRoute>
          <Search />
        </ProtectedRoute>} />
        <Route path="search/:username" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route path="followers/:username" element={<ProtectedRoute>
          <Followers />
        </ProtectedRoute>} />
        <Route path="follows/:username" element={<ProtectedRoute>
          <Follows />
        </ProtectedRoute>} />
        <Route path="addpost" element={<ProtectedRoute>
          <AddPost />
        </ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute>
          <Settings />
        </ProtectedRoute>} />
      </Route>
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }/>
      <Route path="/signup" element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      } />
      <Route path='/test' element={<Test />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router