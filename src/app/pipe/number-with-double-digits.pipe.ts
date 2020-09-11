import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithDoubleDigits'
})
export class NumberWithDoubleDigitsPipe implements PipeTransform {

  transform(number: any): any {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

}
