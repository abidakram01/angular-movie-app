import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {
  @Input() title!: string;
  @Input() id!: number | string;
  @Input() items: any[] = [];
  @Input() name!: string;
}
