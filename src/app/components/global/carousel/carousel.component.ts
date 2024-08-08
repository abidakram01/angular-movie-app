import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})


export class CarouselComponent implements AfterViewInit, OnChanges {
  @Input() title!: string;
  @Input() id!: number | string;
  @Input() exploreLink!: string;
  @Input() items: any[] = [];
  @Input() canNavigateLeft = false;
  @Input() canNavigateRight = false;
  @Input() infoLink!: string;
  @Input() isCastCarousel = false;
  @Input() isDefaultCarousel = true;

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  canNavigateLeftInternal = false;
  canNavigateRightInternal = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.resetCarousel();
    }, 100); // Adjust timeout as necessary
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && !changes['items'].firstChange) {
      this.resetCarousel();
    }
  }

  prevSlide() {
    if (this.carouselContainer.nativeElement.scrollLeft > 0) {
      this.carouselContainer.nativeElement.scrollTo({
        left: this.carouselContainer.nativeElement.scrollLeft - 1000,
        behavior: 'smooth'
      });
      this.updateNavigation();
    }
  }

  nextSlide() {
    if (this.carouselContainer.nativeElement.scrollWidth > this.carouselContainer.nativeElement.scrollLeft + this.carouselContainer.nativeElement.clientWidth) {
      this.carouselContainer.nativeElement.scrollTo({
        left: this.carouselContainer.nativeElement.scrollLeft + 1000,
        behavior: 'smooth'
      });
      this.updateNavigation();
    }
  }

  private updateNavigation() {
    this.canNavigateLeftInternal = this.carouselContainer.nativeElement.scrollLeft > 0;
    this.canNavigateRightInternal = this.carouselContainer.nativeElement.scrollWidth > this.carouselContainer.nativeElement.scrollLeft + this.carouselContainer.nativeElement.clientWidth;
  }

  private resetCarousel() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollLeft = 0; // Reset to the start
      this.updateNavigation();
    } else {
      console.warn('Carousel container not found.');
    }
  }
}