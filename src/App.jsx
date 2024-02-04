import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from './features/blogs/blogSlice';
import { setUser, clearUser } from './features/user/userSlice';
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const logOut = () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogAppUser");
  };

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
        <nav>
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          {user && (
            <span>Logged in as {user.name}<button onClick={logOut}>Logout</button></span>
          )}
        </nav>
        <Notification />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/login" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <Route path="*" element={<LoginForm />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
