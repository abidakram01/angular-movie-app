import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  current = 0;
  private intervalId: any;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.sliderTimer();
  }

  sliderTimer() {
    this.intervalId = setInterval(() => {
      this.current = (this.current + 1) % this.data.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openTrailer(hero: any) {
    const mediaType = hero.number_of_seasons ? 'tv' : 'movie';
    this.apiService.getYouTubeVideo(hero.id, mediaType).subscribe(
      (response: any) => {
        console.log('API Response:', response);  // Log the response
        const video = response.results.find((vid: any) => vid.site === 'YouTube' && ['Trailer', 'Teaser', 'Clip'].includes(vid.type));
        if (video) {
          const videoUrl = `https://www.youtube.com/embed/${video.key}?rel=0&autoplay=1&mute=1`;
          this.modal.openModal(videoUrl);
        } else {
          console.error('No trailer or relevant video found for this media.');
          alert('No trailer or video available for this TV show.');
        }
      },
      error => {
        console.error('Error fetching YouTube video:', error);
      }
    );
  }
}  