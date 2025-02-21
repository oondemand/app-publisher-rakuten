export const formatCurrency = (number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number.toFixed(2)));
};
