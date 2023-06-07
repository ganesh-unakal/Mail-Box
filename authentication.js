import {createSlice} from '@reduxjs/toolkit';

const intialAuthState = {
    token : localStorage.getItem('token'),
    isAuthenticated : localStorage.getItem('isAuthenticated') === 'true',
    userEmail : localStorage.getItem('email')
}
console.log(intialAuthState.token)

const authSlice = createSlice({
    name:'auth',
    initialState : intialAuthState,
    reducers: {
        login(state, action) { 
            state.token = action.payload.token
            state.userEmail= action.payload.email
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('isAuthenticated', true)
        },
         logout(state) {
                state.isAuthenticated = false
                state.token = null
                localStorage.getItem('token')
                localStorage.getItem('email')
                localStorage.getItem('isAuthenticated', false)
            }
        }
    }
)

export const authActions = authSlice.actions

export default authSlice.reducer;