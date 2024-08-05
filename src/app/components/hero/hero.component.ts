import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { delay } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
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
export class HeroComponent implements OnInit, OnDestroy {
  current = 0;
  movies_data: any[] = [];
  private intervalId: any;
  cert: string | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getNowPlaying('movie', 1);
  }

  getNowPlaying(mediaType: 'movie' | 'tv', page: number) {
    this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(
      (res: any) => {
        this.movies_data = res.results;
        if (this.movies_data.length > 0) {
          this.sliderTimer();
        }
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    );
  }

  sliderTimer() {
    this.intervalId = setInterval(() => {
      this.current = (this.current + 1) % this.movies_data.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
