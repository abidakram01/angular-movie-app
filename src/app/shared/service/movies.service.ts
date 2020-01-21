import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public base_url: any = this._config.base_url;
  public api_key: any = this._config.api_key;
  public language: any = this._config.language;
  public append: any = this._config.append;
  public image: any = this._config.image;

  baseUrl: string;
  apiKey: string;

  


  constructor(
    private _http: HttpClient,
    private _config: ConfigService
  ) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
   }


  /*
    Movies Listing
  */
  getdiscoverMovies() {
    const url = this.base_url + `${API_LIST.MOVIES.GET_ALL_MOVIES}?` + this.api_key + '&append_to_response=videos' +'&' + 'page=1';
    return this._http.get(url);
  }

  gettopRatedMovies() {
    const url = this.base_url + `${API_LIST.MOVIES.GET_TOP_RATED_MOVIES}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  getupComingMovies() {
    const url = this.base_url + `${API_LIST.MOVIES.GET_UPCOMING_MOVIES}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  getnowPlayingMovies() {
    const url = this.base_url + `${API_LIST.MOVIES.GET_NOW_PLAYING_MOVIES}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
   Single Movies Details
  */
  getMoviesDetails(id: any) {
    const url = this.base_url + `${API_LIST.MOVIES.GET_SINGLE_MOVIES_DETAILS}` + '/' + id + '?' + this.api_key;
    return this._http.get(url);
  }

  /*
   Single Videos 
  */
  getMoviesVideos(id: any) {
    const url = this.base_url + `${API_LIST.VIDEOS.GET_MOVIES_TRAILER}` + '/' + id + '/videos?' + this.api_key;
    return this._http.get(url);
  }

  /*
   Single Movies Image 
  */
 getBackdropsImages(id: string) {
  const url = this.base_url + `${API_LIST.IMAGES.GET_ALL_MOVIES_BACKDROPS_IMAGE}` + '/' + id + '/images' + '?' + this.api_key;
  return this._http.get(url);
}

/*
  Recomend Movies
*/
getRecomendMovies(id: string){
  const url = this.base_url + `${API_LIST.MOVIES.GET_RECOMMENDATIONS_MOVIES}` + '/' + id + '/recommendations' + '?' + this.api_key;
  return this._http.get(url);
}


  /*
   TV Discover Listing 
  */
  getDiscoverTvShows() {
    const url = this.base_url + `${API_LIST.TV.GET_ALL_TV_SHOWS}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
    TV Popular Listing 
  */
  getPopularTvShows() {
    const url = this.base_url + `${API_LIST.TV.GET_POPULAR_TV_SHOWS}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
    Top Rated TV Listing
  */
  getTopRatedTvShows() {
    const url = this.base_url + `${API_LIST.TV.GET_TOP_RATED_TV_SHOWS}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
    Top Airing TV Listing
  */
  getAiringTvShows() {
    const url = this.base_url + `${API_LIST.TV.CURRENTLY_AIRING_TV_SHOWS}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
    TV Shows Airing Today Listing
  */
  TvShowsAiringToday() {
    const url = this.base_url + `${API_LIST.TV.TV_SHOWS_AIRING_TODAY}?` + this.api_key + '&' + 'page=1';
    return this._http.get(url);
  }

  /*
   Single TV Details 
  */
  getTvDetails(id: any) {
    const url = this.base_url + `${API_LIST.TV.GET_SINGLE_TV_DETAILS}` + '/' + id + '?' + this.api_key;
    return this._http.get(url);
  }

  /*
   Single TV Videos 
  */
  getTvVideos(id: any) {
    const url = this.base_url + `${API_LIST.VIDEOS.GET_TV_TRAILER}` + '/' + id + '/videos?' + this.api_key;
    return this._http.get(url);
  }

  /*
   Single TV Image 
  */
 getTvBackdropsImages(id: string) {
  const url = this.base_url + `${API_LIST.IMAGES.GET_ALL_TV_BACKDROPS_IMAGE}` + '/' + id + '/images' + '?' + this.api_key;
  return this._http.get(url);
}

 /*
   Recomend TV  
  */
 getRecomendTv(id: string){
  const url = this.base_url + `${API_LIST.TV.GET_RECOMMENDATIONS_TV}` + '/' + id + '/recommendations' + '?' + this.api_key;
  return this._http.get(url);
}

  /*
   Genre Listing 
  */
  getGenres() {
    const url = this.base_url + `${API_LIST.GENRE.GET_GENRE}` + '?' + this.api_key;
    return this._http.get(url);
  }

  getTvGenres() {
    const url = this.base_url + `${API_LIST.GENRE.GET_GENRE_TV}` + '?' + this.api_key;
    return this._http.get(url);
  }

  getTvByGenre(id: string) {
    return this._http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false`);
  }


  /*
   Single Genre 
  */
  getMoviesByGenre(id: string) {
    const url = this.base_url + `${API_LIST.GENRE.GET_GENRE_LIST}` + '/' + id + '/movies' + '?' + this.api_key;
    return this._http.get(url);
  }

  /*
   Single Cast 
  */
  getMovieCredits(id: string) {
    const url = this.base_url + `${API_LIST.GENRE.GET_PERSON_CAST}` + '/' + id + '/credits' + '?' + this.api_key;
    return this._http.get(url);
  }


  /*
    Person Details
  */
 getPersonDetail(id: string) {
  const url = this.base_url + `${API_LIST.PERSON.GET_PERSON_DETAILS}` + '/' + id + '?' + this.api_key;
  return this._http.get(url);
 }

  /*
    Person Similar Movies
  */

 getPersonCast(id: string) {
  const url = this.base_url + `${API_LIST.PERSON.GET_PERSON_MOVIES}` + '/' + id + '/movie_credits' + '?' + this.api_key;
  return this._http.get(url);
 }

  // searchMovies(searchStr: string, page: number) {
  //   return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}&page=${page}&language=${this.language}&region=${this.region}`)
  // }
  // getMovieReviews(id: string) {
  //   return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`)
  // }


  // getPersonExternalData(id: string) {
  //   return this.http.get(`${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}`)
  // }

  // getPersonCast(id: string) {
  //   return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`)
  // }

}
