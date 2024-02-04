// Blogs.js
import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import { useSelector } from 'react-redux';

const Blogs = ({ user, showBlogForm, setShowBlogForm, setUser }) => {
  const blogs = useSelector(state => state.blogs)
  console.log("🚀 ~ Blogs ~ blogs:", blogs)
  const logOut = () => {
    setUser(null); // setUser needs to be passed as a prop
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
            user={user}
          /> :
          <button onClick={() => setShowBlogForm(true)}>add blog</button>
        }
      </div>
    </div>
  );
};

export default Blogs;
