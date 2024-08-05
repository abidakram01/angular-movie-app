import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../../../api/api.service';

@Pipe({
  name: 'fullLang'
})
export class FullLangPipe implements PipeTransform {
  constructor(private apiService: ApiService) {}

  transform(iso: string): string {
    // Retrieve languages from the service
    const languages = this.apiService.getLanguages();
    const fullLang = languages.find(lang => lang.iso_639_1 === iso);
    return fullLang ? fullLang.english_name : iso;
  }
}
