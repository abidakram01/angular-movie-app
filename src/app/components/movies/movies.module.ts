import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import {CarouselModule} from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';



@NgModule({
  imports: [
    CommonModule,
    MoviesRoutingModule,
    PipeModule,
    CarouselModule,
    SkeletonModule
  ],
  declarations:[
    MoviesComponent,
  ]
})
export class MoviesModule { }
