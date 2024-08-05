import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithDoubleDigits'
})
export class NumberWithDoubleDigitsPipe implements PipeTransform {
  transform(number: number): string {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  }
}
