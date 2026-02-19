import API from "@/lib/axios";


export const getAllUsers = () => {
  return API.get("/api/admin/users/all");
};