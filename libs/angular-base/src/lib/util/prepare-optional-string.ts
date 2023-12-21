export const prepareOptionalString = (value: string | null | undefined): string | undefined => {
  if (value === null || value === '') {
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  return value;
};
