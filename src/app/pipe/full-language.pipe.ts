import { Pipe, PipeTransform } from '@angular/core';
import { languages } from '../service/language';


@Pipe({
  name: 'fullLanguage'
})
export class FullLanguagePipe implements PipeTransform {

  transform(iso: any): any {
    const fullLang = languages.find(lang => lang.iso_639_1 === iso);

    if (fullLang) {
      return fullLang.english_name;
    }
  
    return iso;
  }

}
