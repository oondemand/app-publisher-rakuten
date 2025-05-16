import { api } from "../config/api";

const criarDocumentoFiscal = async ({ body }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value);
  }

  const { data } = await api.post(
    "/documentos-fiscais/usuario-prestador",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

const getDocumentosFiscais = async () => {
  const { data } = await api.get(`/documentos-fiscais/prestador`);
  return data;
};

export const DocumentoFiscalService = {
  criarDocumentoFiscal,
  getDocumentosFiscais,
};
