import { configureStore } from '@reduxjs/toolkit';
import ecosystemReducer from './ReduxSlice';

export const store = configureStore({
    reducer: {
        ecosystem: ecosystemReducer,
    },
});