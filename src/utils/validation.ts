export const stringOfArrayRequiredValidate = (value: Array<string>) => {
  // Not allow empty string in array or empty array
  if (value.length === 0 || value.some((item) => item.trim() === "")) {
    return "This field is required";
  }

  return undefined;
};

export const urlValidate = (value: string) => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlRegex.test(value)) {
    return "Invalid URL";
  }

  return undefined;
};
