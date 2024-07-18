const localStorageItems = {
  questionLayoutFormat: "questionLayoutFormat",
  theme: "theme",
};

export const getLocalStorage = async (
  param: keyof typeof localStorageItems
) => {
  try {
    const stringifyValue = await localStorage.getItem(localStorageItems[param]);
    if (stringifyValue) {
      return await JSON.parse(stringifyValue);
    }
    throw new Error(`Not found "${localStorageItems[param]}"`);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setLocalStorage = async (
  param: keyof typeof localStorageItems,
  value: any
) => {
  try {
    const stringifyValue = await JSON.stringify(value);
    await localStorage.setItem(localStorageItems[param], stringifyValue);
  } catch (error) {
    console.log(error);
    await localStorage.setItem(localStorageItems[param], value);
  }
};
