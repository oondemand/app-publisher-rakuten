import { api } from "../config/api";

const getTicketsByPrestadorId = async (id) => {
  const { data } = await api.get(`/tickets/usuario-prestador/${id}`);
  return data;
};

const getFile = async ({ id }) => {
  return await api.get(`/tickets/arquivo/${id}`);
};

export const TicketService = {
  getTicketsByPrestadorId,
  getFile,
};
