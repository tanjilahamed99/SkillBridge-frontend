import API from "@/lib/axios";

export const getAllUsers = () => {
  return API.get("/api/superAdmin/users");
};

export const getAllAdmins = () => {
  return API.get("/api/superAdmin/admins");
};

export const createAdmin = (data: object) => {
  return API.post("/api/superAdmin/admin/create", data);
};

export const updateAdmin = (data: object) => {
  return API.put("/api/superAdmin/admin/update", data);
};

export const deleteAdmin = (id: string) => {
  return API.delete(`/api/superAdmin/admin/${id}`);
};

export const getAllCourses = () => {
  return API.get(`/api/superAdmin/courses`);
};

export const updateCourseStatus = (id: string, data: object) => {
  return API.put(`/api/superAdmin/courses/${id}`, data);
};

export const superAdminAnalysis = () => {
  return API.get(`/api/superAdmin/analysis`);
};
