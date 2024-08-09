import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByYear'
})
export class SortByYearPipe implements PipeTransform {

  transform(items: any[], yearKey: string): any[] {
    if (!items || items.length === 0) {
      return items;
    }

    return items.sort((a, b) => {
      const yearA = a[yearKey] || 0;
      const yearB = b[yearKey] || 0;
      return yearB - yearA; // Sort in descending order
    });
  }
}
