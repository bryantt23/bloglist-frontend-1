import { useState, } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from '../features/notifications/notificationSlice';
import { addBlog } from '../features/blogs/blogSlice';

const BlogForm = ({ setShowBlogForm, user }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch()

    const addNewBlog = (e) => {
        e.preventDefault()
        async function fetch() {
            const blog = { title, author, url }
            await blogService.addBlog(blog, user.token)
            dispatch(setNotificationWithTimeout({ message: `${title} by ${author} added`, type: "success" }))
            dispatch(addBlog(blog))
        }
        fetch()
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={addNewBlog}>
            <div>
                title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} data-testid="title-input" />
            </div>
            <div>
                author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)} data-testid="author-input" />
            </div>
            <div>
                url: <input type="text" value={url} onChange={e => setUrl(e.target.value)} data-testid="url-input" />
            </div>
            <div>
                <button type="submit">add</button>
                <button onClick={() => { setShowBlogForm(false) }}>cancel</button>
            </div>
        </form>
    </div>
}

// Define PropTypes for BlogForm
BlogForm.propTypes = {
    setShowBlogForm: PropTypes.func.isRequired,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired
    }).isRequired
};

export default BlogForm