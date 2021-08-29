import { format } from "date-fns";

export const shortDate = (ts: string) => {
  const date = Date.parse(ts);

  return format(date, "MMM d, p");
};
