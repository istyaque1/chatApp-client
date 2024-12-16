import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: [],
  selectUser: null,
  loading: false,
  isError: null,
};

export const messages = createAsyncThunk(
  "messages/all",
  async ({ token, id }) => {
    console.log(token, id);

    try {
      const response = await axios.get(
        `http://localhost:8000/user/get/message/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === true) {
        return response?.data?.messages;
      } else {
        throw new Error(response?.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
);

export const getUsersSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    currentSelectedUser: (state, action) => {
      state.selectUser = action.payload;
    },
    emptyChat: (state, action) => {
      state.message = [];
    },
    appendMessage: (state, action) => {
      state.message = [...state.message, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(messages.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(messages.fulfilled, (state, action) => {
      (state.loading = false), (state.message = action.payload);
    });
    builder.addCase(messages.rejected, (state, action) => {
      state.loading = false;
      state.isError = action.payload;
    });
  },
});

export const { currentSelectedUser, emptyChat, appendMessage } =
  getUsersSlice.actions;

export default getUsersSlice.reducer;
