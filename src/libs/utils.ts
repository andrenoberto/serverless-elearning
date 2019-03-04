import {Config} from '@config/environment';

export const toPascalCase = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
};

export const validateMasterKey = (req): boolean => {
  const {master} = Config.factory();
  return req.body.key === master.key;
};
