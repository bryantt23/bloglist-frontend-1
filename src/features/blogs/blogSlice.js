import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return null
        }
    }
})

export const setNotificationWithTimeout = (notification, timeout = 3000) => {
    return dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer