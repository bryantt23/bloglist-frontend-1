export const setNotification = (message, timeout = 3000) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: message,
        })

        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, timeout)
    }
}