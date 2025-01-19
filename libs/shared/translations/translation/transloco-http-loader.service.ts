import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  readonly #httpClient = inject(HttpClient);

  public getTranslation(lang: 'en' | 'fr'): Observable<Translation> {
    return this.#httpClient.get<Translation>(
      `./assets/translations/${lang}.json`,
    );
  }
}
