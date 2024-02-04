// Blogs.js
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
      <h2>blogs</h2>
      {blogs.map(blog => (
        <div style={{ border: "solid 1px" }} key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
        </div>
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
