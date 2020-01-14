import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    PipeModule,
    CarouselModule
  ],
  declarations:[
    MoviesComponent,
  ]
  
})
export class MoviesModule { }
