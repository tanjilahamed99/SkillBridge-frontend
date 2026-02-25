import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interface for enrollment data
export interface EnrollmentData {
  _id?: string;
  enrolledAt: string | Date;
  status: "active" | "completed" | "dropped";
  progress: number;
  completedLessons: string[];
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  paymentAmount: number;
  lastAccessed?: string | Date;
  completedAt?: string | Date;
  grade?: string;
  courseId: string;
}

export interface CourseReference {
  _id: string;
  courseId?: string;
  status?: string;
  thumbnail?: string | null;
  totalStudents?: number;
  totalRevenue?: number;
  title?: string;
}

export interface User {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
  picture?: string | null;
  qualification?: string;
  bio?: string;
  // Updated to accept full enrollment objects
  enrolledCourses?: Array<string | EnrollmentData | { _id: string }>;
  createdCourses?: Array<string | CourseReference>;
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
        // Merge the new data with existing user data
        state.user = { ...state.user, ...action.payload };

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
