function getTimestampFromDate(date: Date | string, endOfDay?: boolean): number {
  const dateString = typeof date === 'string' ? date : date.toISOString().substr(0, 10);

  const time = endOfDay ? '23:59:59' : '00:00:00';

  return new Date(`${dateString}T${time}`).getTime();
}

export default getTimestampFromDate;
