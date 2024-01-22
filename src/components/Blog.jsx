import { useState, } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, sendNotification, getBlogsFromApi }) => {
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


  return <div style={blogStyle}>
    {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details"}</button>
    {showDetails && <div>Author: {blog.author}, url: {blog.url}, likes: {blog.likes} <button onClick={addLike}>Like</button>
      <p>Added by {blog.user.name}</p></div>}
  </div>
}

export default Blog