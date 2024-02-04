// Blogs.js
import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/user/userSlice';

const Blogs = ({ showBlogForm, setShowBlogForm }) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogAppUser");
    setShowBlogForm(false);
  };

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog._id} blog={blog}
          user={user}
        />
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
