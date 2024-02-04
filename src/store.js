import notificationReducer from './features/notifications/notificationSlice';
import blogsReducer from './features/blogs/blogSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer
    }
})
