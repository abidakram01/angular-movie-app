import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      // Some transformation logic
      return new Date(value).toLocaleDateString();
    }
    // Return a default value or handle the case where value is falsy
    return '';
  }
}
