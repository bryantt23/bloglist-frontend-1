// Blogs.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const [showBlogForm, setShowBlogForm] = useState(true)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <div style={{ border: "solid 1px" }} key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
        </div>
      ))}
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
