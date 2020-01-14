import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { PipeModule } from 'src/app/shared/pipe/pipe.module';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    PipeModule,
    MatTabsModule,
    CarouselModule
  ]
})
export class PersonModule { }
