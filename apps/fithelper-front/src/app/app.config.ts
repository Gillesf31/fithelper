import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@fithelper/shared/translations/translation';

const availableLangs = ['en', 'fr'];
const defaultLang = 'en';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
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
