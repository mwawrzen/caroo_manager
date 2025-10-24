export function checkStringIsInt(value: string): boolean {
  return !!value.match(/^\d+$/);
};
