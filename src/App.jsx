import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from './features/notifications/notificationSlice';
import { setBlogs } from './features/blogs/blogSlice';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const dispatch = useDispatch()

  const getBlogsFromApi = () => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes))));
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
      dispatch(setNotificationWithTimeout({ message: 'Wrong credentials', type: "error" }));
    }
  };

  return (
    <div>
      <Notification />
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
          user={user}
          setUser={setUser}
          showBlogForm={showBlogForm}
          setShowBlogForm={setShowBlogForm}
        />}

    </div>
  );
};

export default App;
