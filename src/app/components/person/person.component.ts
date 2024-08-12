import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {
  id!: number;
  person_data: any;
  external_data: any;
  activeTab: string = 'knownfor';
  posters: any;
  knownfor: any
  posters_data: any[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      this.getPersonDetails(this.id);
      this.getPersonPoster(this.id)
      this.getKnowFor(this.id)
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });

  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getPersonDetails(id: number) {
    this.apiService.getPerson(id).subscribe((result: any) => {
      this.person_data = result;
      this.getPersonalExternal(id);
    });
  }

  getPersonalExternal(id: number) {
    this.apiService.getPersonExternalId(id).subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getPersonPoster(id: number) {
    this.apiService.getPersonImages(id).subscribe((res: any) => {
        this.posters = res.profiles.map((profile: any) => ({
            ...profile,
            full_path: profile.file_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${profile.file_path}` : null,
        }));

    });
}

  getKnowFor(id: number) {
    this.apiService.getPersonCredit(id).subscribe((result: any) => {
      this.knownfor = result.cast.map((item: any) => {
        const releaseDate = item.release_date || item.first_air_date;
        const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
        return {
          link: `/movie/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.title,
          rating: item.vote_average * 10,
          vote: item.vote_average,
          year: year
        };
      });
      this.cdr.detectChanges();
    },
      error => {
        console.error('Error fetching credits data', error);
      });
  }

}