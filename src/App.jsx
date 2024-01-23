import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs';

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
      setUser(userTemp)
      setShowBlogForm(false)
    }
  }, []);

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
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>

      {user === null ?
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        /> :
        <Blogs
          blogs={blogs}
          user={user}
          setUser={setUser} // Make sure to pass setUser
          sendNotification={sendNotification}
          getBlogsFromApi={getBlogsFromApi}
          showBlogForm={showBlogForm}
          setShowBlogForm={setShowBlogForm}
        />}

    </div>
  );
};

export default App;
