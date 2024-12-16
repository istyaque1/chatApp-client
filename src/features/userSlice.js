import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
};

export const createUser = createAsyncThunk(
  "user/create",
  async ({ formData, navigate, toast }) => {
    try {
      const response = await axios.post(
        "https://chatapp-server-yfh2.onrender.com/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response?.data?.message);
      navigate("/login");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password, navigate, toast }) => {
    try {
      const response = await axios.post("https://chatapp-server-yfh2.onrender.com/user/login", {
        username,
        password,
      });

      if (response?.data?.status === true) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("id", response?.data?.userId);
        localStorage.setItem("username", response?.data?.username);
        localStorage.setItem("profilepic", response?.data?.profilepic);

        navigate("/chat");

        toast.success(response?.data?.message);

        return response.data;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
