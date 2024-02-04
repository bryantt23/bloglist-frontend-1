import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs';
import { useDispatch } from 'react-redux';
import { setNotificationWithTimeout } from './features/notifications/notificationSlice';
import { setBlogs } from './features/blogs/blogSlice';
import { setUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';

const App = () => {
  const [showBlogForm, setShowBlogForm] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  const getBlogsFromApi = () => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes))));
  }

  useEffect(() => {
    getBlogsFromApi()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userTemp = JSON.parse(loggedUserJSON)
      dispatch(setUser(userTemp))
      setShowBlogForm(false)
    }
  }, []);

  return (
    <div>
      <Notification />
      <h2>blogs</h2>

      {user === null ?
        <LoginForm
        /> :
        <Blogs
          showBlogForm={showBlogForm}
          setShowBlogForm={setShowBlogForm}
        />}

    </div>
  );
};

export default App;
