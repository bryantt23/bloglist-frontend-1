import notificationReducer from './features/notifications/notificationSlice';
import blogsReducer from './features/blogs/blogSlice';
import userReducer from './features/user/userSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})
