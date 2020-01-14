import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AppMovieDialogComponent } from './app-movie-dialog/app-movie-dialog.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    MovieDetailsComponent, 
    AppMovieDialogComponent
  ],
  entryComponents: [
    AppMovieDialogComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    PipeModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule
  ],

})
export class MovieDetailsModule { }
