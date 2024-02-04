// Blogs.js
import React, { useState } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/user/userSlice';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [showBlogForm, setShowBlogForm] = useState(true)

  const logOut = () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog._id} blog={blog} />
      ))}
      {user.name} is logged in <button onClick={logOut}>Logout</button>
      <div>
        {showBlogForm ?
          <BlogForm
            setShowBlogForm={setShowBlogForm}
          /> :
          <button onClick={() => setShowBlogForm(true)}>add blog</button>
        }
      </div>
    </div>
  );
};

export default Blogs;
