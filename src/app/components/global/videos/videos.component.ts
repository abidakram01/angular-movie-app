import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent {
  @Input() videosData: any[] = [];
  @Input() videoTypes: string[] = [];

  @ViewChild(ModalComponent) modal!: ModalComponent;

  openVideoModal(videoKey: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}?rel=0&autoplay=1&mute=1`;
    this.modal.openModal(videoUrl);
  }
}
