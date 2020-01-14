import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule
} from '@angular/material';

import { GenreListRoutingModule } from './genre-list-routing.module';
import { GenreListComponent } from './genre-list.component';


@NgModule({
  declarations: [GenreListComponent],
  imports: [
    CommonModule,
    GenreListRoutingModule,
    MatButtonModule
  ]
})
export class GenreListModule { }
