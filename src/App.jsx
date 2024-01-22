import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)

  const sendNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => { setNotification(null) }, 3000)
  }

  const getBlogsFromApi = () => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }

  useEffect(() => {
    getBlogsFromApi()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userTemp = JSON.parse(loggedUserJSON)
      console.log("🚀 ~ useEffect ~ userTemp:", userTemp)
      setUser(userTemp)
      setShowBlogForm(false)
    }
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

  const getBlogs = () => {
    const logOut = () => {
      setUser(null)
      window.localStorage.removeItem("loggedBlogAppUser")
      setShowBlogForm(false)
    }
    return (
      <div>
        {
          blogs.map(blog => (
            <Blog key={blog._id} blog={blog}
              sendNotification={sendNotification}
              getBlogsFromApi={getBlogsFromApi} />
          ))
        }
        {user.name} is logged in <button onClick={logOut}>Logout</button>
        <div>
          {showBlogForm ? <BlogForm
            setShowBlogForm={setShowBlogForm}
            user={user}
            sendNotification={sendNotification}
            getBlogsFromApi={getBlogsFromApi}
          /> : <button onClick={() => { setShowBlogForm(true) }}>add blog</button>}
        </div>
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
      sendNotification({ message: 'Wrong credentials', type: "error" });

      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>

      {user === null ? loginForm() : getBlogs()}

    </div>
  );
};

export default App;
