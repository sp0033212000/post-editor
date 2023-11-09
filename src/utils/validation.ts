export const stringOfArrayRequiredValidate = (value: Array<string>) => {
  // Not allow empty string in array or empty array
  if (value.length === 0 || value.some((item) => item.trim() === "")) {
    return "This field is required";
  }

  return undefined;
};
