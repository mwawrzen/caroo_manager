import { LangEnum } from '@/utils/types';
import { availableLanguages } from './data';

export function mapLanguage(lang: LangEnum): string {
  const langObj = availableLanguages.find( l => l.name === lang);
  return langObj ? langObj.code : '';
}
