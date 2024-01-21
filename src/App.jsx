import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userTemp = JSON.parse(loggedUserJSON)
      console.log("🚀 ~ useEffect ~ userTemp:", userTemp)
      setUser(userTemp)
    }
  }, []);


  const blogForm = () => {
    const addBlog = (e) => {
      e.preventDefault()
      async function fetch() {
        await blogService.addBlog({ title, author, url }, user.token)
        blogService.getAll().then(blogs => setBlogs(blogs));
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
        </div>
      </form>
    </div>

  }
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>

        <div>
          password
          <input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>)
  }

  const getBlogs = () => {
    const logOut = () => {
      setUser(null)
      window.localStorage.removeItem("loggedBlogAppUser")
    }
    return (
      <div>
        {
          blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))
        }
        <button onClick={logOut}>Logout</button>

        {blogForm()}
      </div>
    )
  }

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  };

  return (
    <div>
      <h2>blogs</h2>

      {user === null ? loginForm() : getBlogs()}

    </div>
  );
};

export default App;
