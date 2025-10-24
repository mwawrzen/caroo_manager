export function checkStringIsDouble(value: string): boolean {
  return !!value.match(/^(\d*\.?\d{0,2}|)$/);
}
