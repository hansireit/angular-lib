import { isNil } from './is-nil';

describe('IsNil', () => {
  it('should correctly detect nil values', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should detect non-nil values', () => {
    expect(isNil('Hello')).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(100)).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil(-1)).toBe(false);
  });
});
