import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { register as apiRegister } from "../../api/register";
import { login as apiLogin } from "../../api/login";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../types";

interface AuthState {
  user: string | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(
      state,
      action: PayloadAction<{ user: string; token: string; role: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    authFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;

export const initializeAuth = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      dispatch(
        authSuccess({
          user: decodedToken.given_name,
          token,
          role: decodedToken.role,
        })
      );
    } catch (error) {
      console.error("Failed to decode token:", error);
      dispatch(authFail("Failed to authenticate with stored token."));
    }
  }
};

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      const response = await apiLogin(username, password);
      const { token } = response.data;
      const decodedToken: DecodedToken = jwtDecode(token);
      dispatch(
        authSuccess({
          user: decodedToken.given_name,
          token,
          role: decodedToken.role,
        })
      );
      localStorage.setItem("token", token);

      return true;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      dispatch(authFail(error.response?.data?.message || "Failed to login"));
      return false;
    }
  };

export const register =
  ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) =>
  async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      const response = await apiRegister(email, username, password);
      const { token } = response.data;
      const decodedToken: DecodedToken = jwtDecode(token);
      dispatch(
        authSuccess({
          user: decodedToken.given_name,
          token,
          role: decodedToken.role,
        })
      );
      localStorage.setItem("token", token);

      return true;
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      dispatch(authFail(error.response?.data?.message || "Failed to register"));

      return false;
    }
  };

export const selectAuth = (state: any) => state.auth;

export default authSlice.reducer;
