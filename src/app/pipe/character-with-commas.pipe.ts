import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterWithCommas'
})
export class CharacterWithCommasPipe implements PipeTransform {

  transform(array: any) {
    if (array) {
      return array.map(item => item.name).join(', ');
    }
  }

}



