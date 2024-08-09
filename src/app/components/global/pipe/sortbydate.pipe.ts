import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByReleaseDate'
})
export class SortByReleaseDatePipe implements PipeTransform {

  transform(items: any[], releaseDateField: string = 'release_date'): any[] {
    if (!items || !releaseDateField) {
      return items;
    }

    return items.sort((a, b) => {
      const dateA = new Date(a[releaseDateField]).getTime();
      const dateB = new Date(b[releaseDateField]).getTime();
      return dateB - dateA; // Sort by latest release date first
    });
  }

}
