import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog: (state, action) => {
            state.push(action.payload)
        }
    }
})


export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer