import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authentication';
import inboxSlice from './InboxSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    inbox: inboxSlice
  }
})

export default store;
