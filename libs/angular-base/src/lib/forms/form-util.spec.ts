import { FormUtil } from './form-util';

describe('FormUtil', () => {
  it('should get the correct difference of two objects when a primitive property was changed', () => {
    const oldData = {
      name: 'Foo'
    };
    const newData = {
      name: 'Bar'
    };

    const [object, changed] = FormUtil.getDifferenceRecursively(oldData, newData);
    expect(changed).toBe(true);
    expect(object).toStrictEqual({
      name: 'Bar'
    });
  });

  it('should get the correct difference of two objects when a primitive property was NOT changed', () => {
    const oldData = {
      name: 'Foo'
    };
    const newData = {
      name: 'Foo'
    };

    const [object, changed] = FormUtil.getDifferenceRecursively(oldData, newData);
    expect(changed).toBe(false);
    expect(object).toStrictEqual({});
  });

  it('should get the correct difference of two objects when a nested property was changed', () => {
    const oldData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10
      }
    };
    const newData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10,
        day: 31
      }
    };

    const [object, changed] = FormUtil.getDifferenceRecursively(oldData, newData);
    expect(changed).toBe(true);
    expect(object).toStrictEqual({
      date: {
        day: 31
      }
    });
  });

  it('should get the correct difference of two objects when a nested property was NOT changed', () => {
    const oldData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10
      }
    };
    const newData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10
      }
    };

    const [object, changed] = FormUtil.getDifferenceRecursively(oldData, newData);
    expect(changed).toBe(false);
    expect(object).toStrictEqual({});
  });

  it('should get the correct difference of two objects when a nested property was removed', () => {
    const oldData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10,
        day: 31
      }
    };
    const newData = {
      name: 'Foo',
      date: {
        year: 2023,
        month: 10,
        day: null
      }
    };

    const [object, changed] = FormUtil.getDifferenceRecursively(oldData, newData);
    expect(changed).toBe(true);
    expect(object).toStrictEqual({
      date: { day: null }
    });
  });

  it('should get an object that only contains the changes of two objects', () => {
    const oldObject = {
      name: 'Tester',
      age: 23,
      address: {
        street: 'My street'
      }
    };
    const newObject = {
      name: 'Tester',
      age: 21,
      address: {
        street: 'My new street'
      }
    };
    const update = {};
    FormUtil.getUpdatedFormData(update, oldObject, newObject);
    expect(update).toStrictEqual({
      age: 21,
      address: {
        street: 'My new street'
      }
    });
  });

  it('should not get updates if the old and new object have the same content', () => {
    const oldObject = {
      name: 'Tester',
      age: 23,
      address: {
        street: 'My street'
      }
    };
    const newObject = {
      name: 'Tester',
      age: 23,
      address: {
        street: 'My street'
      }
    };
    const update = {};
    FormUtil.getUpdatedFormData(update, oldObject, newObject);
    expect(update).toStrictEqual({});
  });
});
