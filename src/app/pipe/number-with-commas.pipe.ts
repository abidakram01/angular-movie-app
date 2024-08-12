import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(number:string): any {
    if(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
  }

}
