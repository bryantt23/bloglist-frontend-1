import { useState, } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)
  return <div style={blogStyle}>
    {blog.title} <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details"}</button>
    {showDetails && <div>Author: {blog.author}, url: {blog.url}, likes: {blog.likes}
      <p>Added by {blog.user.name}</p></div>}
  </div>
}

export default Blog