import { z } from "zod";

export const formatCurrency = (number) => {
  if (!number) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number.toFixed(2)));
};

export const requiredCurrencyValidation = z.coerce
  .string()
  .nonempty("Campo obrigatório")
  .transform((value) => {
    const isNegative = value.includes("-");
    const isCurrencyString = value.includes("R$");

    const numericString = isCurrencyString
      ? value
          .replaceAll(".", "-")
          .replaceAll("R$", "")
          .replaceAll(",", ".")
          .replaceAll("-", "")
          .trim()
      : value.replaceAll("-", "");

    const numero = Number(numericString);

    return isNegative ? -numero : numero;
  });
