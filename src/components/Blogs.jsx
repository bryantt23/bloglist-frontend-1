// Blogs.js
import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';

const Blogs = ({ blogs, user, sendNotification, getBlogsFromApi, showBlogForm, setShowBlogForm, setUser }) => {
  const logOut = () => {
    setUser(null); // setUser needs to be passed as a prop
    window.localStorage.removeItem("loggedBlogAppUser");
    setShowBlogForm(false);
  };

  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog._id} blog={blog}
          sendNotification={sendNotification}
          getBlogsFromApi={getBlogsFromApi}
          user={user}
        />
      ))}
      {user.name} is logged in <button onClick={logOut}>Logout</button>
      <div>
        {showBlogForm ?
          <BlogForm
            setShowBlogForm={setShowBlogForm}
            user={user}
            sendNotification={sendNotification}
            getBlogsFromApi={getBlogsFromApi}
          /> :
          <button onClick={() => setShowBlogForm(true)}>add blog</button>
        }
      </div>
    </div>
  );
};

export default Blogs;
