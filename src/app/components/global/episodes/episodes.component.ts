import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  id!: number;
  episodes_data: any[] = [];
  selectedSeason: number = 1;
  seasons: any[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];

      this.apiService.getTvShow(this.id).subscribe(
        result => {
          this.handleTvInfo(result);
          this.spinner.hide();
        },
        error => {
          console.error('Error fetching data', error);
          this.spinner.hide();
        }
      );
    });
  }

  handleTvInfo(result: any) {
    this.seasons = result.seasons.filter((season: any) => season.season_number !== 0);
    
    this.selectedSeason = this.seasons.length > 0 ? this.seasons[0].season_number : 1;
    
    this.loadEpisodes(this.id, this.selectedSeason);
  }

  loadEpisodes(id: number, season: number): void {
    this.apiService.getTvShowEpisodes(id, season)
      .subscribe(
        (data) => {
          this.episodes_data = data.episodes;
        },
        (error) => {
          console.error('Error fetching episodes:', error);
        }
      );
  }

  onSeasonChange(event: any): void {
    const selectedSeason = event.target.value;
    this.loadEpisodes(this.id, selectedSeason);
  }
}
