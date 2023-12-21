import { prepareOptionalString } from './prepare-optional-string';

describe('PrepareOptionalString', () => {
  it('should correctly prepare a optional string value', () => {
    expect(prepareOptionalString('')).toBe(undefined);
    expect(prepareOptionalString(null)).toBe(undefined);
    expect(prepareOptionalString(undefined)).toBe(undefined);
    expect(prepareOptionalString('real-value')).toBe('real-value');
  });
});
