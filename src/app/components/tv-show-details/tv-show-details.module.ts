import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowDetailsRoutingModule } from './tv-show-details-routing.module';
import { TvShowDetailsComponent } from './tv-show-details.component';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';


@NgModule({
  declarations: [
    TvShowDetailsComponent,
    AppTvDialogComponent
  ],
  entryComponents: [
    AppTvDialogComponent
  ],
  imports: [
    CommonModule,
    TvShowDetailsRoutingModule,
    PipeModule,
    TabViewModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule
  ]
})
export class TvShowDetailsModule { }
