import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageName'
})
export class LanguageNamePipe implements PipeTransform {

  private languageMap: { [code: string]: string } = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'hi': 'Hindi',
    'ar': 'Arabic',
    'pt': 'Portuguese',
    'ru': 'Russian',
  };

  transform(value: string | string[]): string {
    if (Array.isArray(value)) {
      return value.map(lang => this.languageMap[lang] || lang).join(', ');
    }
    return this.languageMap[value] || value;
  }

}
