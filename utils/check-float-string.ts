export function checkStringIsFloat(value: string): boolean {
  return !!value.match(/^(\d*\.?\d{0,2}|)$/);
};
