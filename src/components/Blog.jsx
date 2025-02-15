import { useState, } from 'react';
import blogService from '../services/blogs';
import { useSelector, useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../features/notifications/notificationSlice';
import { updateBlog, deleteBlog } from '../features/blogs/blogSlice';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b._id === id))
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const addLike = () => {
    async function fetch() {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.updateBlog(updatedBlog, blog._id)
      dispatch(updateBlog(returnedBlog))
      dispatch(setNotificationWithTimeout({ message: `${blog.title} by ${blog.author} liked`, type: "success" }))
    }
    fetch()
  }
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    if (comment.trim() === '') {
      return; // Don't add empty comments
    }

    try {
      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, comment], // Add the comment to the existing comments
      };

      const returnedBlog = await blogService.updateBlog(updatedBlog, blog._id);
      dispatch(updateBlog(returnedBlog));

      // Clear the comment input field
      setComment('');

      dispatch(
        setNotificationWithTimeout({
          message: `Comment added to ${blog.title} by ${blog.author}`,
          type: 'success',
        })
      );
    } catch (error) {
      // Handle error (e.g., show an error notification)
    }
  };

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

  if (!blog) {
    return <div>Loading...</div>; // Or some other placeholder content
  }

  return (
    <div style={blogStyle}>
      <span className="blog-title">{blog.title}</span>
      <div>
        <span className="blog-author">Author: {blog.author}</span>
        <span className="blog-url">URL: {blog.url}</span>
        <span className="blog-likes">Likes: {blog.likes}</span>
        <button className="blog-like-button" onClick={addLike}>Like</button>
        {blog.user.name === user.name && <button className="blog-delete-button" onClick={deleteTheBlog}>Delete blog</button>}
        <p>Added by {blog.user.name}</p>
        <ul>
          {blog.comments?.length > 0 ? (
            blog.comments.map(comment => <li key={comment._id}>{comment}</li>)
          ) : (
            <li>{blog.comments ? "No comments found" : "Loading comments..."}</li>
          )}
        </ul>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default Blog;