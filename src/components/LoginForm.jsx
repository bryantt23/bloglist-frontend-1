import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setUser } from '../features/user/userSlice';
import { setNotificationWithTimeout } from '../features/notifications/notificationSlice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(setNotificationWithTimeout({ message: 'Wrong credentials', type: "error" }));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
