import { format } from "date-fns";

export const formatCompetence = ({ year, month }) => {
  return format(new Date(year, month - 1, 1), "MM/yy");
};
