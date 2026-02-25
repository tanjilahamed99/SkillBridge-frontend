import API from "@/lib/axios";

export const getUsers = () => {
  return API.get("/api/admin/users");
};
export const updateUserStatus = (userId: string, data: object) => {
  return API.put(`/api/admin/user/${userId}`, data);
};
export const getAdminDashboard = () => {
  return API.post("/api/auth/login");
};
export const getCourses = () => {
  return API.get("/api/admin/course");
};
export const updateCourseStatus = (courseId: string, data: object) => {
  return API.put(`/api/admin/course/${courseId}`, data);
};
export const getAdminAnalytics = () => {
  return API.get("/api/admin/analysis");
};
