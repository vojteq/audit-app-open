import { useState, useEffect } from "react";

const originalSetItem = localStorage.setItem;
localStorage.setItem = function () {
  const event = new Event("storageChange");
  document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};
const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function () {
  const event = new Event("storageChange");
  document.dispatchEvent(event);
  originalRemoveItem.apply(this, arguments);
};

function useLocalStorage(key) {
  const storageItem = localStorage.getItem(key);

  const [storageValue, setValue] = useState(
    !!storageItem ? JSON.parse(storageItem) : null
  );

  const setLocalItem = () => {
    setTimeout(() => {
      const valueFromStorage = localStorage.getItem(key);
      const value = valueFromStorage && JSON.parse(valueFromStorage);
      setValue(value);
    }, 50);
  };

  const setStorageValue = (value) => {
    const parsedValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, parsedValue);
  };

  useEffect(() => {
    document.addEventListener("storageChange", setLocalItem, false);
    return () => document.removeEventListener("storageChange", setLocalItem);
  }, []);

  return [storageValue, setStorageValue];
}

export default useLocalStorage;
