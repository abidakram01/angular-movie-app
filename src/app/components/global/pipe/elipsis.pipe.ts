import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, length: number = 218, clamp: string = '...'): string {
    if (!text) return '';
    if (text.length <= length) return text;
    let tcText = text.slice(0, length - clamp.length);
    let last = tcText.length - 1;
    while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;
    last = last || length - clamp.length;
    tcText = tcText.slice(0, last);
    return tcText + clamp;
  }
}
