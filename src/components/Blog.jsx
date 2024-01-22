import { useState, } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, sendNotification, getBlogsFromApi, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)
  const addLike = () => {
    async function fetch() {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateBlog(updatedBlog, blog._id)
      sendNotification({ message: `${blog.title} by ${blog.author} liked`, type: "success" })
      getBlogsFromApi()
    }
    fetch()
  }

  const deleteTheBlog = () => {
    async function fetch() {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(user.token, blog._id)
        sendNotification({ message: `${blog.title} by ${blog.author} deleted`, type: "success" })
        getBlogsFromApi()
      }

    }
    fetch()
  }

  return <div style={blogStyle}>
    {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details"}</button>
    {showDetails && <div>Author: {blog.author}, url: {blog.url}, likes: {blog.likes} <button onClick={addLike}>Like</button>
      {blog.user.name === user.name && <button onClick={deleteTheBlog}>Delete blog</button>}

      <p>Added by {blog.user.name}</p></div>}
  </div>
}

export default Blog