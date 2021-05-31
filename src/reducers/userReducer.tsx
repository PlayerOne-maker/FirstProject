import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

interface AuthValues {
    logged: User | null,
}

const initialState: AuthValues = {
    logged: null,
}

export const userSlice = createSlice({
    name: 'auht',
    initialState,
    reducers: {
        loggeduser: (state, action) => {
            state.logged = action.payload
        }
    },
})

export const {
    loggeduser,
} = userSlice.actions

export const getUser = (state : any) => state.auht.logged

export default userSlice.reducer;