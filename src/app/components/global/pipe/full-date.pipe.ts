import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullDate'
})
export class FullDatePipe implements PipeTransform {
  transform(dateString: string): string {
    const dateArray = dateString.split('-');
    const date = dateArray[2].startsWith('0') ? dateArray[2].substr(1) : dateArray[2];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date} ${months[parseInt(dateArray[1], 10) - 1]} ${dateArray[0]}`;
  }
}
