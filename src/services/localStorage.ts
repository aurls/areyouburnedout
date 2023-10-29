const set = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save value to local storage');
  }
};

const get = (key: string): any => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch {
    console.error('Failed to get value from local storage');

    return null;
  }
};

const remove = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.error('Failed to remove value from local storage');
  }
};

export default {
  set,
  get,
  remove
};
