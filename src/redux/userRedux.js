import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMsg: "",
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.isError = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.isSuccess = true
            state.currentUser = action.payload
            console.log('user:', state.currentUser)
        },
        loginFailure: (state) => {
            state.isError = true
            state.isFetching = false
        },
        clearIsError: (state) => {
            state.isError = false
        },
        default: (state) => {
            return state
        },
        clearResults() {
            
        }
        

    }
})

export const { loginStart, loginSuccess, loginFailure, clearIsError } = userSlice.actions

export default userSlice.reducer