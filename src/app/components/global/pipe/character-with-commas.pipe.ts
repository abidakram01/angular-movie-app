import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterWithCommas'
})
export class CharacterWithCommasPipe implements PipeTransform {

  transform(array: { name: string }[] | null | undefined): string {
    if (array && Array.isArray(array)) {
      return array.map(item => item.name || '').join(', ');
    }
    return '';
  }

}
