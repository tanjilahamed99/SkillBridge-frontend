import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  enrolledCourses?: Array<string | { _id: string }>; // Accept both
  createdCourses?: Array<string | { _id: string }>;  // Accept both
}

interface AuthState {
  user: User | null;
}

const getUserFromStorage = (): User | null => {
  if (typeof window !== "undefined") {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }
  return null;
};

const initialState: AuthState = {
  user: getUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    logout: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        // Normalize the data before saving
        const updatedUser = { ...state.user, ...action.payload };
        
        // Ensure createdCourses is stored consistently
        if (updatedUser.createdCourses) {
          updatedUser.createdCourses = updatedUser.createdCourses.map(course => 
            typeof course === 'object' && course !== null ? course._id : course
          );
        }
        
        state.user = updatedUser;

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;