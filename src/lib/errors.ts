const PROTECTED_DATA = 'Protected health data is inaccessible';

export const shouldIgnore = (err: Error) => {
  if (err.message.includes(PROTECTED_DATA)) {
    return true;
  }
  return false;
};
