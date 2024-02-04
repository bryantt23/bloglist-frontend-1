import { useEffect } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs';
import { useDispatch } from 'react-redux';
import { setBlogs } from './features/blogs/blogSlice';
import { setUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import Users from './components/Users';

const App = () => {
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
    }
  }, []);

  return (
    <div>
      <Notification />
      <h2>blogs</h2>

      {user === null ?
        <LoginForm
        /> :
        <Blogs />}

      <Users />
    </div>
  );
};

export default App;
