import authentication from "./authentication";
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authentication';

const store = configureStore({
  reducer: {
    authentication : authSlice
  }
})

export default store;
