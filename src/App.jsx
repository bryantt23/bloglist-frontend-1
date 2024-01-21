import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

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

  const getBlogs = () => (
    blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))
  )

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      })
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
