import { api } from "../config/api";

const getTicketsByPrestadorId = async (id) => {
  const { data } = await api.get(`/tickets/usuario-prestador/${id}`);
  return data;
};

const getFile = async ({ id }) => {
  return await api.get(`/tickets/arquivo/${id}`);
};

const uploadFiles = async ({ ticketId, files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("arquivos", file);
  }

  return await api.post(`/tickets/${ticketId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const TicketService = {
  getTicketsByPrestadorId,
  getFile,
  uploadFiles,
};
