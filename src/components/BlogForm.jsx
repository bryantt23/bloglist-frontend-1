import { useState, } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions';

const BlogForm = ({ setShowBlogForm, user, getBlogsFromApi }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch()

    const addBlog = (e) => {
        e.preventDefault()
        async function fetch() {
            await blogService.addBlog({ title, author, url }, user.token)
            dispatch(setNotification({ message: `${title} by ${author} added`, type: "success" }))
            getBlogsFromApi()
        }
        fetch()
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
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
    }).isRequired,
    getBlogsFromApi: PropTypes.func.isRequired
};

export default BlogForm