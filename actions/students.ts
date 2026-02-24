import API from "@/lib/axios";

export const getAllCourse = () => {
  return API.get(`/api/student/courses`);
};
