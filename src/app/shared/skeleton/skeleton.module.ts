import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [SkeletonComponent],
  exports:[SkeletonComponent]
})
export class SkeletonModule { }
