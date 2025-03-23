export enum LSKeys {
  SELECTED_ASSOCIATION = 'SELECTED_ASSOCIATION',
}

const setItem = <T = any>(key: LSKeys, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getItem = <T = any>(key: LSKeys): T | null => {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const removeItem = (key: LSKeys): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

const hasItem = (key: LSKeys): boolean => {
  return typeof window !== 'undefined' && localStorage.getItem(key) !== null;
};

const clearStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

const LS = {
  clearStorage,
  hasItem,
  removeItem,
  getItem,
  setItem,
};

export default LS;
