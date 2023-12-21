import { removeNullValuesRecursively } from './remove-nil-values-recursively';

describe('RemoveNullValuesRecursively', () => {
  it('should remove null values recursively from an given object', () => {
    const obj = {
      passengers: [
        {
          name: 'Foo',
          date: {
            year: 2023,
            month: 10,
            day: null
          }
        }
      ]
    };

    const result = removeNullValuesRecursively(obj);
    expect(result).toStrictEqual({
      passengers: [
        {
          name: 'Foo',
          date: {
            year: 2023,
            month: 10
          }
        }
      ]
    });
  });
});
