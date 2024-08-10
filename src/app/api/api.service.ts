import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'dd4d819639705d332d531217b4f7c6b6';
  private language = 'en-US';
  

  constructor(private http: HttpClient) { }

  getNowPlaying(mediaType: string, page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString() });
    return this.http.get(`${this.apiUrl}/${mediaType}/now_playing`, { params })
      .pipe(catchError(this.handleError));
}

  getCategory(category: string, page: number, mediaType: string): Observable<any> {
    const params = this.buildParams({ page: page.toString() });
    return this.http.get(`${this.apiUrl}/${mediaType}/${category}`, { params })
      .pipe(catchError(this.handleError));
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`, { params: this.buildParams({}) })
      .pipe(catchError(this.handleError));
  }

  getExternalId(id: number, mediaType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${mediaType}/${id}/external_ids`, { params: this.buildParams({}) })
      .pipe(catchError(this.handleError));
  }

  getRecommended(id: number, page: number, mediaType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${mediaType}/${id}/recommendations`, { params: this.buildParams({}) })
  }

  getBackdrops(id: number, mediaType: string): Observable<any> {
    const url = `${this.apiUrl}/${mediaType}/${id}/images?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getYouTubeVideo(id: number, mediaType: string): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/${mediaType}/${id}/videos`, { params })
    .pipe(catchError(this.handleError));
  }
  
  // getMovies(query: string, page: number): Observable<any> {
  //   const params = this.buildParams({ query, page: page.toString() });
  //   return this.http.get(`${this.apiUrl}/search/movie`, { params })
  //     .pipe(catchError(this.handleError));
  // }

  // getTvShows(query: string, page: number): Observable<any> {
  //   const params = this.buildParams({ query, page: page.toString() });
  //   return this.http.get(`${this.apiUrl}/search/tv`, { params })
  //     .pipe(catchError(this.handleError));
  // }

  getTrending(media: string, page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString() });
    return this.http.get(`${this.apiUrl}/trending/${media}/week`, { params })
      .pipe(catchError(this.handleError));
  }

  getTvDiscover(page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString() });
    return this.http.get(`${this.apiUrl}/discover/tv`, { params })
      .pipe(catchError(this.handleError));
  }
  // getTvCategory(category: string, page: number): Observable<any> {
  //   const params = this.buildParams({ page: page.toString() });
  //   return this.http.get(`${this.apiUrl}/tv/${category}`, { params })
  //     .pipe(catchError(this.handleError));
  // }

  // geTvExternalId(id: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/tv/${id}/external_ids`, { params: this.buildParams({}) })
  //     .pipe(catchError(this.handleError));
  // }

  // getTvBackdrops(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`;
  //   return this.http.get<any>(url);
  // }

  getPersonExternalId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/person/${id}/external_ids`, { params: this.buildParams({}) })
      .pipe(catchError(this.handleError));
  }

  getTvShow(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/${id}`, { params: this.buildParams({}) })
      .pipe(catchError(this.handleError));
  }


  // getTvShowRecommended(id: number, page: number): Observable<any> {
  //   const params = this.buildParams({ page: page.toString() });
  //   return this.http.get(`${this.apiUrl}/tv/${id}/recommendations`, { params })
  //     .pipe(catchError(this.handleError));
  // }

  getTvShowEpisodes(id: number, season: number): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/tv/${id}/season/${season}`, { params })
      .pipe(catchError(this.handleError));
  }

  // getTvYouTubeVideo(id: number): Observable<any> {
  //   const params = this.buildParams({});
  //   return this.http.get(`${this.apiUrl}/tv/${id}/videos`, { params })
  //   .pipe(catchError(this.handleError));
  // }

  

  getMediaByGenre(media: string, genreId: number, page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString(), with_genres: genreId.toString() });
    return this.http.get(`${this.apiUrl}/discover/${media}`, { params })
      .pipe(catchError(this.handleError));
  }

  getGenreList(media: string): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/genre/${media}/list`, { params })
      .pipe(catchError(this.handleError));
  }

  // getByGenre(id: number, type: string, page: number): Observable<any> {
  //   const params = this.buildParams({ page: page.toString() });  
  //   return this.http.get(`${this.apiUrl}/genre/${id}/${type}`, { params })
  //     .pipe(catchError(this.handleError));
  // }

  getCredits(id: number, type: string): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/${type}/${id}/credits`, { params })
      .pipe(catchError(this.handleError));
  }

  getPerson(id: number): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/person/${id}`, { params })
      .pipe(catchError(this.handleError));
  }
  getPersonImages(id: number): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/person/${id}/images`, { params })
      .pipe(catchError(this.handleError));
  }

  getPersonCredit(id: number): Observable<any> {
    const params = this.buildParams({});
    return this.http.get(`${this.apiUrl}/person/${id}/movie_credits`, { params })
      .pipe(catchError(this.handleError));
  }

  search(query: string, page: number): Observable<any> {
    const params = this.buildParams({ query, page: page.toString() });
    return this.http.get(`${this.apiUrl}/search/multi`, { params })
      .pipe(catchError(this.handleError));
  }

  

  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams().set('api_key', this.apiKey).set('language', this.language);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong'));
  }
}