import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvComponent } from './components/tv/tv.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { searchReducer } from './store/search.reducer';
import { SearchComponent } from './components/global/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Pipes
import { RuntimePipe } from './components/global/pipe/runtime.pipe';
import { ArrayToListPipe } from './components/global/pipe/array-to-list.pipe';
import { CharacterWithCommasPipe } from './components/global/pipe/character-with-commas.pipe';
import { DateFormatPipe } from './components/global/pipe/date.pipe';
import { FullLangPipe } from './components/global/pipe/full-language.pipe';
import { FullDatePipe } from './components/global/pipe/full-date.pipe';
import { NumberWithCommasPipe } from './components/global/pipe/number-with-commas.pipe';
import { NumberWithDoubleDigitsPipe } from './components/global/pipe/number-with-double-digits.pipe';
import { RatingPipe } from './components/global/pipe/rating.pipe';
import { TimePipe } from './components/global/pipe/time.pipe';
import { CarouselComponent } from './components/global/carousel/carousel.component';
import { MoviesInfoComponent } from './components/movies-info/movies-info.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    MoviesComponent,
    TvComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,

    // pipes
    RuntimePipe,
    ArrayToListPipe,
    CharacterWithCommasPipe,
    DateFormatPipe,
    FullLangPipe,
    FullDatePipe,
    NumberWithCommasPipe,
    NumberWithDoubleDigitsPipe,
    RatingPipe,
    RuntimePipe,
    TimePipe,
    CarouselComponent,
    MoviesInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ search: searchReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
