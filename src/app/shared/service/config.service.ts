import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public base_url = 'https://api.themoviedb.org/3/';
  public api_key = 'API KEY';
  public language = '&language=en-US';
  public append = '&append_to_response=videos,credits,images,external_ids,release_dates';
  public image = '&include_image_language=en';

  constructor() { }
}
