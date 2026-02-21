import API from "@/lib/axios";

export const createCurse = (id: string, data: object) => {
  return API.post(`/api/instructor/${id}`, data);
};
