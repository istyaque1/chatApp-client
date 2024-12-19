import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token") || null,
  userid: localStorage.getItem("userid") || null,
  username: localStorage.getItem("username") || null,
  profilepic: localStorage.getItem("profilepic") || null,
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
      navigate("/login", { replace: true });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password, navigate, toast, dispatch }) => {
    try {
      const response = await axios.post(
        "https://chatapp-server-yfh2.onrender.com/user/login",
        {
          username,
          password,
        }
      );

      if (response?.data?.status === true) {
        console.log(response?.data);

        const { token, userId, username, profilepic } = response?.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("profilepic", profilepic);

        toast.success(response?.data?.message);

        navigate("/chat", { replace: true });

        return response?.data;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.userid = null;
      state.username = null;
      state.profilepic = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("profilepic");
    },
  },
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
      const { token, userId, username, profilepic } = action.payload;
      state.token = token;
      state.userid = userId;
      state.username = username;
      state.profilepic = profilepic;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
