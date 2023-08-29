import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/features/userSlice'
import memoriesAPI from '../redux/services/memoriesAPI'

const store = configureStore({
    reducer: {
        [memoriesAPI.reducerPath]: memoriesAPI.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memoriesAPI.middleware),
})

 export type RootState = ReturnType<typeof store.getState>;
 export type AppDispatch = typeof store.dispatch;

export default store;