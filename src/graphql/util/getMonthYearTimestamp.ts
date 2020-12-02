export default function getMonthYearTimestamp(
  month: number,
  year: number = new Date().getFullYear()
): number {
  if (month < 1 || month > 12) {
    throw new TypeError('Month is not a valid month');
  }

  if (!/\d{4}/.test(`${year}`)) {
    throw new TypeError('Year is not a valid year');
  }

  const formattedMonth = month >= 10 ? `${month}` : `0${month}`;

  return new Date(`${year}-${formattedMonth}-01T00:00:00`).getTime();
}
