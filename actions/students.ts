import { EnrollmentData } from "@/features/auth/authSlice";
import API from "@/lib/axios";

export const getAllCourse = () => {
  return API.get(`/api/student/courses`);
};

export const getCourseData = (id: string) => {
  return API.get(`/api/student/course/${id}`);
};

export const enrollInCourse = (courseId: string) => {
  return API.post(`/api/student/enroll/${courseId}`);
};

export const updateLessonStatus = (courseId: string, data: (string | EnrollmentData | { _id: string; })[]) => {
  return API.put(`/api/student/course/lesson/${courseId}`, data);
};
