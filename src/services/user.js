import { api } from "../config/api";

const updateUser = async ({ id, body }) => {
  const { data } = await api.put(`/usuarios/${id}`, body);
  return data;
};

export const UserService = {
  updateUser,
};
