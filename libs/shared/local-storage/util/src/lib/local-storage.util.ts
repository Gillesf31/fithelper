export function localStorageSetItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function localStorageGetItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function localStorageClear(): void {
  localStorage.clear();
}
