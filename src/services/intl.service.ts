import { Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';

import { I18nContext, I18nService } from 'nestjs-i18n';

import { I18nTranslations } from '@/generated/i18n.generated';

@Injectable()
export class IntlService {
  constructor(private readonly _i18n: I18nService<I18nTranslations>) {}

  public translate<
    K extends keyof I18nTranslations,
    T extends keyof I18nTranslations[K],
  >(name: PathImpl2<I18nTranslations>): I18nTranslations[K][T] {
    return this._i18n.t(name, {
      lang: I18nContext.current().lang,
    }) as I18nTranslations[K][T];
  }
}
