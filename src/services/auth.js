import { api } from "../config/api";

const login = async (values) => {
  const { data } = await api.post("/auth/login", values);
  return data;
};

const forgotPassword = async (email) => {
  return await api.post("/auth/esqueci-minha-senha", email);
};

const createNewPassword = async (values) => {
  const code = localStorage.getItem("code");
  const { data } = await api.post("/auth/alterar-senha", { ...values, code });
  return data;
};

const changePassword = async (values) => {
  const { data } = await api.post("/auth/alterar-senha", values);
  return data;
};

const validateToken = async () => {
  const response = await api.get("/auth/validar-token");
  return response.data;
};

export const LoginService = {
  login,
  forgotPassword,
  createNewPassword,
  changePassword,
  validateToken,
};
