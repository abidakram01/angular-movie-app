import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api/api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.performSearch(this.query);
      }
    });
  }

  performSearch(query: string): void {
    this.apiService.search(query, 1).subscribe(
      (response: any) => {
        this.searchResults = response.results.map((item: any) => {
          return {
            link: item.media_type === 'movie' ? `/movie/${item.id}` : item.media_type === 'tv' ? `/tv/${item.id}` : `/person/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : '',
            title: item.title || item.name,
            rating: item.vote_average ? item.vote_average * 10 : 'N/A',
            vote: item.vote_average ? item.vote_average : 'N/A',
            poster_path: item.poster_path
          };
        });
      },
      error => {
        console.error('Search failed', error);
      }
    );
  }
  
}

