import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  @Input() filteredVideos: any[] = [];
  @Input() videoTypes: string[] = [];

  filterVideos(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filteredVideos = filterValue === 'ALL'
      ? this.filteredVideos
      : this.filteredVideos.filter(video => video.type === filterValue);
  }
}
