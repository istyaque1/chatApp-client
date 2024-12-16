import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userList: [],
  isLoading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "getUsers/all",
  async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        return response?.data?.users;
      } else {
        throw new Error(response?.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  }
);


export const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      (state.isLoading = false), (state.userList = action.payload)
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });
  },
});

export const {} = getUsersSlice.actions;

export default getUsersSlice.reducer;
