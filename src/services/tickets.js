import { api } from "../config/api";

const getTicketsByPrestadorId = async (id) => {
  const { data } = await api.get(`/tickets/usuario-prestador/${id}`);
  return data;
};

export const TicketService = {
  getTicketsByPrestadorId,
};
