import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() videoUrl: string | null = null;
  isVisible = false;

  openModal(videoUrl: string) {
    this.videoUrl = videoUrl;
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.videoUrl = null;
  }

}
