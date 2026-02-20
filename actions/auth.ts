import API from "@/lib/axios";

export const login = (email: string, password: string) => {
  return API.post("/api/auth/login", { email, password });
};

export const register = (data : object) => {
  return API.post("/api/auth/register", data);
};

export const myData = () => {
  return API.get("api/auth/profile");
};

export const sendCode = (email: string) => {
  return API.post("api/auth/forgot-password", { email });
};

export const forgetPassword = (email: string, authCode: string, password: string) => {
  return API.post("/api/auth/reset-password", {
    email,
    code: authCode,
    password,
  });
};

export const changePassword = (email: string, newPassword: string, password: string) => {
  return API.post("/api/auth/change-password", {
    email,
    newPassword,
    password,
  });
};
