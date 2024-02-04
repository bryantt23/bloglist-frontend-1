import { useState, } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../features/notifications/notificationSlice';
import { updateBlog, deleteBlog } from '../features/blogs/blogSlice';

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  const addLike = () => {
    async function fetch() {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.updateBlog(updatedBlog, blog._id)
      dispatch(updateBlog(returnedBlog))
      dispatch(setNotificationWithTimeout({ message: `${blog.title} by ${blog.author} liked`, type: "success" }))
    }
    fetch()
  }

  const deleteTheBlog = () => {
    async function fetch() {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(user.token, blog._id)
        dispatch(deleteBlog(blog._id))
        dispatch(setNotificationWithTimeout({ message: `${blog.title} by ${blog.author} deleted`, type: "success" }))
      }
    }
    fetch()
  }

  return (
    <div style={blogStyle}>
      <span className="blog-title">{blog.title}</span>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide details" : "Show details"}
      </button>

      {showDetails && (
        <div>
          <span className="blog-author">Author: {blog.author}</span>
          <span className="blog-url">URL: {blog.url}</span>
          <span className="blog-likes">Likes: {blog.likes}</span>
          <button className="blog-like-button" onClick={addLike}>Like</button>
          {blog.user.name === user.name && <button className="blog-delete-button" onClick={deleteTheBlog}>Delete blog</button>}
          <p>Added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;