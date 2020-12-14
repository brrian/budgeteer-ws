interface ParsedMonth {
  endOfMonth: string;
  month: number;
  startOfMonth: string;
  year: number;
}

export default function parsePrevMonth(): ParsedMonth {
  const date = new Date();
  date.setDate(0);

  const endOfMonth = date.toISOString().substring(0, 10);

  date.setMonth(date.getMonth());
  date.setDate(1);

  const startOfMonth = date.toISOString().substring(0, 10);

  return {
    endOfMonth,
    month: date.getMonth() + 1,
    startOfMonth,
    year: date.getFullYear(),
  };
}
