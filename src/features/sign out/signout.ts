import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


interface AuthState {
  user: string | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      // Clear other auth-related data if needed
    },
  },
});

export const { setUser, signOut } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
