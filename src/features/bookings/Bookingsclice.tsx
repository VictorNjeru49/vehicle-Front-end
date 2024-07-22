import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface BookingState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  booking: [] | null;
}

const initialState: BookingState = {
  status: 'idle',
  error: null,
  booking: null,
};

// Thunk for creating a booking and initiating payment
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/bookings', bookingData);
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.booking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;
