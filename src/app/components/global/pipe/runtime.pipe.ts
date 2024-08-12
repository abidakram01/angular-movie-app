import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime'
})
export class RuntimePipe implements PipeTransform {
  transform(minutes: number): string {
    const seconds = minutes * 60;
    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft = secondsLeft % 3600;
    const mins = Math.floor(secondsLeft / 60);
    return `${hours ? hours + 'h ' : ''}${mins}min`;
  }
}
