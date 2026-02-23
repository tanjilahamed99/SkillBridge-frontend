import API from "@/lib/axios";

export const createCurse = (id: string, data: object) => {
  return API.post(`/api/instructor/${id}`, data);
};

export const getCurses = (id: string) => {
  return API.get(`/api/instructor/all/${id}`);
};

export const deleteCourse = (id: string) => {
  return API.delete(`/api/instructor/${id}`);
};
