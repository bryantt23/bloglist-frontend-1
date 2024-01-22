import { useState, } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setShowBlogForm, user, sendNotification, getBlogsFromApi }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (e) => {
        e.preventDefault()
        async function fetch() {
            await blogService.addBlog({ title, author, url }, user.token)
            sendNotification({ message: `${title} by ${author} added`, type: "success" })
            getBlogsFromApi()
        }
        fetch()
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
            <div>
                title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
            </div>
            <div>
                url: <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
                <button onClick={() => { setShowBlogForm(false) }}>cancel</button>
            </div>
        </form>
    </div>
}

export default BlogForm