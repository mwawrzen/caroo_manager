const pad = (str: string) => str.padStart(2, '0');

export function formatDate(date: Date): string {
  const dateString = date.toLocaleString().split(',')[0];
  const dateUnits = dateString.split('.');
  const formattedDate = `${pad(dateUnits[0])}.${pad(dateUnits[1])}.${dateUnits[2]}`;
  return formattedDate;
};
