import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {
  transform(number: number): string {
    if (number.toString().length <= 1) {
      return `${number.toString()}.0`;
    }
    return number.toString();
  }
}
