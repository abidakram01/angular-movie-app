import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [
    CommonModule,
    TvShowsRoutingModule,
    PipeModule,
    CarouselModule
  ],
  declarations:[
    TvShowsComponent,
  ]
})
export class TvShowsModule { }
