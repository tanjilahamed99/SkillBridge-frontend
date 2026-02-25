import API from "@/lib/axios";

export const getUsers = () => {
  return API.get("/api/admin/users");
};
export const updateUserStatus = (userId: string, data: object) => {
  return API.put(`/api/admin/user/${userId}`, data);
};
export const deleteUser = () => {
  return API.post("/api/auth/login");
};
export const getAdminDashboard = () => {
  return API.post("/api/auth/login");
};
export const getCourses = () => {
  return API.post("/api/auth/login");
};
export const updateCourseStatus = () => {
  return API.post("/api/auth/login");
};
export const getAdminAnalytics = () => {
  return API.post("/api/admin/analysis");
};
