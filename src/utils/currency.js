export const formatCurrency = (number) => {
  if (!number) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number.toFixed(2)));
};
