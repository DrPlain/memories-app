import {createSlice} from '@reduxjs/toolkit';
import { IUser } from '../../../../server/src/models/User';

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        logout: (state) => {state.user=null},
        setUser: ((state, action) => {
            state.user = action.payload;
        })
    }
})

export default userSlice.reducer;
export const {setUser, logout}  = userSlice.actions