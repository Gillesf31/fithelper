import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslocoHttpLoader } from '@fithelper/shared/translations/translation';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { appRoutes } from './app.routes';

const availableLangs = ['en', 'fr'];
const defaultLang = 'en';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const transloco = inject(TranslocoService);
      const navLang = navigator.language;
      const shortLanguage = navLang.split('-')[0];
      const lang: string = availableLangs.includes(shortLanguage)
        ? shortLanguage
        : defaultLang;
      transloco.setActiveLang(lang);
      return transloco.load(lang);
    }),
  ],
};
