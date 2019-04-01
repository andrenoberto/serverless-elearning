import {Config} from '@config/environment';

export const getFileName = (fileName: string, extension: string): string => {
  return fileName.slice(0, extension.length * -1);
};

export const toPascalCase = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return letter.toUpperCase();
  }).replace(/\s+/g, '');
};

export const validateMasterKey = (req): Promise<Error> => {
  return new Promise((resolve, reject) => {
    const {master} = Config.factory();
    if (req.body.key === master.key) {
      resolve();
    } else {
      reject(new Error('The provided key is not valid.'));
    }
  });
};
