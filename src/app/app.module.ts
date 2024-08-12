import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';

// Pipes
import { RuntimePipe } from './components/global/pipe/runtime.pipe';
import { ArrayToListPipe } from './components/global/pipe/array-to-list.pipe';
import { CharacterWithCommasPipe } from './components/global/pipe/character-with-commas.pipe';
import { DateFormatPipe } from './components/global/pipe/date.pipe';
import { FullDatePipe } from './components/global/pipe/full-date.pipe';
import { NumberWithCommasPipe } from './components/global/pipe/number-with-commas.pipe';
import { NumberWithDoubleDigitsPipe } from './components/global/pipe/number-with-double-digits.pipe';
import { RatingPipe } from './components/global/pipe/rating.pipe';
import { TimePipe } from './components/global/pipe/time.pipe';
import { TruncatePipe } from './components/global/pipe/elipsis.pipe';
import { SortByReleaseDatePipe } from './components/global/pipe/sortbydate.pipe';


// Components
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { SliderComponent } from './components/global/slider/slider.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvComponent } from './components/tv/tv.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/global/search/search.component';
import { CarouselComponent } from './components/global/carousel/carousel.component';
import { MoviesInfoComponent } from './components/movies-info/movies-info.component';
import { TvInfoComponent } from './components/tv-info/tv-info.component';
import { HeroComponent } from './components/global/hero/hero.component';
import { MediaComponent } from './components/global/media/media.component';
import { VideosComponent } from './components/global/videos/videos.component';
import { ImagesComponent } from './components/global/images/images.component';
import { PersonComponent } from './components/person/person.component';
import { ListingComponent } from './components/global/listing/listing.component';
import { SortByYearPipe } from './components/global/pipe/sort-by-year.pipe';
import { MovieCategoryComponent } from './components/movie-category/movie-category.component';
import { TvCategoryComponent } from './components/tv-category/tv-category.component';
import { GenreComponent } from './components/genre/genre.component';
import { LanguageNamePipe } from './components/global/pipe/language-name.pipe';
import { EpisodesComponent } from './components/global/episodes/episodes.component';
import { ModalComponent } from './components/global/modal/modal.component';
import { SafeUrlPipe } from './components/global/pipe/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RuntimePipe,
    SortByReleaseDatePipe,
    ArrayToListPipe,
    CharacterWithCommasPipe,
    DateFormatPipe,
    FullDatePipe,
    NumberWithCommasPipe,
    NumberWithDoubleDigitsPipe,
    RatingPipe,
    TruncatePipe,
    RuntimePipe,
    TimePipe,
    SortByYearPipe,
    NavbarComponent,
    SliderComponent,
    MoviesComponent,
    TvComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    CarouselComponent,
    MoviesInfoComponent,
    TvInfoComponent,
    HeroComponent,
    MediaComponent,
    VideosComponent,
    ImagesComponent,
    PersonComponent,
    ListingComponent,
    MovieCategoryComponent,
    TvCategoryComponent,
    GenreComponent,
    LanguageNamePipe,
    EpisodesComponent,
    ModalComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
