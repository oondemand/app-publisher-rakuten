import { format } from "date-fns";

export const formatCompetence = ({ year, month }) => {
  return format(new Date(year, month - 1, 1), "MM/yy");
};

export const formatDateToDDMMYYYY = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("T")[0].split("-");

  return `${day}/${month}/${year}`;
};
