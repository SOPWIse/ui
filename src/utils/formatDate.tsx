import { format, isValid, parseISO } from "date-fns";

export function formatDate(
  date?: string | null | Date,
  formatString = "hh:mm:ss b dd/LL/yyyy O"
) {
  try {
    let parsedDate: Date;
    if (typeof date === "string" && date.length === 0) {
      return "NA";
    } else if (date instanceof Date) {
      parsedDate = date;
    } else if (typeof date === "string") {
      parsedDate = parseISO(date);
      if (!isValid(parsedDate)) {
        throw new Error("Invalid date format");
      }
    } else {
      throw new Error("Invalid date type");
    }
    return format(parsedDate, formatString);
  } catch (error) {
    console.error(error);
    return "NA";
  }
}
