import { DateTime, DateTimeOptions } from 'luxon';

export function formatDate(dateISO: string, withHour?: boolean, opts?: DateTimeOptions) {
  const date = DateTime.fromISO(dateISO, { zone: 'local', ...opts });

  if (!date.isValid) return '';

  const format = withHour ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy';

  return date.toFormat(format);
}

export function setToEndOfDay(dateISO: string) {
  const date = new Date(dateISO);

  date.setUTCHours(23, 59, 59, 999);

  return date;
}

export function getTimeAgo(dateISO: string, opts?: DateTimeOptions): string {
  const createdAt = DateTime.fromISO(dateISO, { zone: 'local', ...opts });

  const timeNumberToString = (value: number) => (value * -1).toFixed(0);

  const createdAtDiffNow = createdAt.diffNow(['minutes', 'hours', 'days']).toObject();

  if (createdAtDiffNow.days && createdAtDiffNow.days < 0) {
    const daysInString = timeNumberToString(createdAtDiffNow.days);

    return daysInString !== '1' ? `${daysInString} dias atrás` : '1 dia atrás';
  }

  if (createdAtDiffNow.hours && createdAtDiffNow.hours < 0) {
    const hoursInString = timeNumberToString(createdAtDiffNow.hours);

    return hoursInString !== '1' ? `${hoursInString} horas atrás` : '1 hora atrás';
  }

  if (createdAtDiffNow.minutes && createdAtDiffNow.minutes < 0) {
    const minutesInString = timeNumberToString(createdAtDiffNow.minutes);

    return minutesInString !== '1' ? `${minutesInString} minutos atrás` : '1 minuto atrás';
  }

  return 'Agora';
}

export function getCurrentDate(): string {
  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat('yyyy-MM-dd');

  return formattedDate;
}

export function formatTime(num: number): string {
  return num.toFixed().padStart(2, '0');
}

export function formatStringDateToIsoString(date: Date): string {
  return formatDate(new Date(`${date}`).toISOString());
}
