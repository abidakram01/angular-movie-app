import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { MoviesService } from '../../shared/service/movies.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('900ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('900ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SliderComponent implements OnInit {
  current = 0;
  movies_data: any;
  tv_shows: any;
  
  constructor(
    private _movies: MoviesService,
  ) {}

  ngOnInit() {
      this.discoverMovies();
      this.sliderTimer();
  }

  discoverMovies() {
    this._movies.getdiscoverMovies().subscribe((res: any) => {
      this.movies_data = res.results;
    })
  }
  
  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies_data.length;
    }, 4000);
  }

}
