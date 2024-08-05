import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToList'
})
export class ArrayToListPipe implements PipeTransform {
  transform(array: { name: string }[]): string {
    return array.map(item => item.name).join(', ');
  }
}
