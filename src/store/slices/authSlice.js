import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:8080/api';

const authAPI = {
  signIn: async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return await response.json();
  },

  signInWithGoogle: async () => {
    const response = await fetch(`${BASE_URL}/auth/signin/google`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Google authentication failed');
    return await response.json();
  },

  signUp: async (userData) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  },

  updateUser: async (userId, userData, token) => {
    const response = await fetch(`${BASE_URL}/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Update failed');
    return await response.json();
  },

  signOut: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Logout failed');
    return await response.json();
  }
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.signInWithGoogle();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.signUp(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ userId, userData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token;
      const response = await authAPI.updateUser(userId, userData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.signOut();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem('user')) || null;
      } catch {
        return null;
      }
    })(),
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    success: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },
    processGoogleResponse: (state, action) => {
      try {
        const data = action.payload;
        if (data && data.success && data.response) {
          const { user, token } = data.response;
          state.user = { ...user, token };
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.success = data.message;
          localStorage.setItem('user', JSON.stringify({ ...user, token }));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('token', token);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        state.error = error.message;
        state.loading = false;
        state.isAuthenticated = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.response.user;
        state.isAuthenticated = true;
        state.error = null;
        state.success = action.payload.message;
        localStorage.setItem('user', JSON.stringify(action.payload.response.user));
        localStorage.setItem('token', action.payload.response.token);
        localStorage.setItem('isAuthenticated', 'true');
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        if (action.payload.response) {
          const { user, token } = action.payload.response;
          state.loading = false;
          state.user = { ...user, token };
          state.isAuthenticated = true;
          state.error = null;
          state.success = action.payload.message;
          localStorage.setItem('user', JSON.stringify({ ...user, token }));
          localStorage.setItem('token', token);
          localStorage.setItem('isAuthenticated', 'true');
        }
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.response.user;
        state.isAuthenticated = true;
        state.error = null;
        state.success = action.payload.message;
        localStorage.setItem('user', JSON.stringify(action.payload.response.user));
        localStorage.setItem('token', action.payload.response.token);
        localStorage.setItem('isAuthenticated', 'true');
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.response.user;
        state.error = null;
        state.success = action.payload.message;
        localStorage.setItem('user', JSON.stringify(action.payload.response.user));
        localStorage.setItem('token', action.payload.response.token);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.success = 'Successfully signed out!';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearError,
  clearSuccess,
  logout,
  processGoogleResponse
} = authSlice.actions;

export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUser = state => state.auth.user;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthError = state => state.auth.error;
export const selectAuthSuccess = state => state.auth.success;

export default authSlice.reducer;