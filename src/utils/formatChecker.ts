export const isSet = <Whatever>(
  what: null | undefined | Whatever,
): what is Whatever => {
  return what !== undefined && what !== null;
};

export const isNotSet = <Whatever>(
  what: null | undefined | Whatever,
): what is null | undefined => {
  return what === undefined || what === null || typeof what === "undefined";
};

export const isBoolean = <Whatever>(
  what: boolean | Whatever,
): what is boolean => {
  return typeof what === "boolean";
};

export const isFalse = <Whatever>(what: false | Whatever): what is false => {
  return what === false;
};

export const isTrue = <Whatever>(what: true | Whatever): what is true => {
  return what === true;
};

export const isString = (what: any): what is string => {
  return typeof what === "string";
};

export const isEmptyString = (what: string = "") => what.length === 0;
export const isRestrictedEmptyString = (what: string = "") =>
  what.trim().length === 0;

export const isNotEmptyString = (what: string = "") => what.length !== 0;

export const isEmptyArray = (what: Array<any>) => what.length === 0;

export const isNotEmptyArray = (what: Array<any>) => what.length !== 0;
