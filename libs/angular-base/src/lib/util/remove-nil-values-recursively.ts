/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNil } from './is-nil';

export const removeNullValuesRecursively = (object: any): any => {
  if (Array.isArray(object)) {
    const newObject = [];

    for (const obj of object) {
      newObject.push(removeNullValuesRecursively(obj));
    }

    return newObject;
  } else if (typeof object === 'object') {
    const newObject: any = {};

    for (const key in object) {
      if (isNil(object[key])) {
        continue;
      }

      if (typeof object[key] === 'object') {
        const objectToSet = removeNullValuesRecursively(object[key]);
        if (Object.keys(objectToSet)?.length) {
          newObject[key] = objectToSet;
        }
      } else {
        newObject[key] = object[key];
      }
    }

    return newObject;
  } else {
    return object;
  }
};
