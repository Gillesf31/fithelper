import { localStorageSetItem } from '@fithelper/shared/local-storage/util';

export function handleAppTheme(
  defaultLightTheme: string,
  defaultDarkTheme: string,
): void {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setDataTheme(theme);
    return;
  }
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    setDataTheme(defaultDarkTheme);
    localStorageSetItem('theme', defaultDarkTheme);
  } else {
    setDataTheme(defaultLightTheme);
    localStorageSetItem('theme', defaultLightTheme);
  }
}

export function toggleTheme(theme: string): void {
  localStorageSetItem('theme', theme);
  setDataTheme(theme);
}

function setDataTheme(theme: string): void {
  document?.querySelector('html')?.setAttribute('data-theme', theme);
}
