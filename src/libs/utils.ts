export const toPascalCase = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
};
