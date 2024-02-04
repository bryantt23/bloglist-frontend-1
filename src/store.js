import notificationReducer from './features/notifications/notificationSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({ reducer: { notification: notificationReducer } })
