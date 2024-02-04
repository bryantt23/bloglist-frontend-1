import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import User from './components/User';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from './features/blogs/blogSlice';
import { setUser } from './features/user/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const getBlogsFromApi = () => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes))));
  };

  useEffect(() => {
    getBlogsFromApi();
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const userTemp = JSON.parse(loggedUserJSON);
      dispatch(setUser(userTemp));
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Notification />
        <h2>blogs</h2>
        <Routes>
          {user ? (
            // Routes accessible when the user is logged in
            <>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />

              {/* Redirect from login to blogs if user is already logged in */}
              <Route path="/login" element={<Navigate replace to="/" />} />
            </>
          ) : (
            // Only the login form is accessible when the user is not logged in
            <Route path="*" element={<LoginForm />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
