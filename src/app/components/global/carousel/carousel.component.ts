import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
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

export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title!: string;
  @Input() id!: number | string;
  @Input() exploreLink!: string;
  @Input() items: any[] = [];
  @Input() canNavigateLeft = false;
  @Input() canNavigateRight = true; // Defaulting to true to enable navigation by default
  @Input() infoLink!: string;
  @Input() isCastCarousel = false;
  @Input() isDefaultCarousel = true;
  @Input() isExplore = true;
  @Input() isDefaultExplore = false;

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  private routerSubscription!: Subscription;

  constructor(private router: Router) {
    // Add window resize listener to update navigation buttons
    window.addEventListener('resize', this.updateNavigation.bind(this));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resetCarousel();
      this.updateNavigation();
    }, 300); // Increased timeout to ensure elements are fully rendered

    // Subscribe to router events to reset the carousel on route change
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetCarousel();
      }
    });
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
      setTimeout(() => {
        this.updateNavigation();
      }, 300);
    }
  }

  nextSlide() {
    if (this.carouselContainer.nativeElement.scrollWidth > this.carouselContainer.nativeElement.scrollLeft + this.carouselContainer.nativeElement.clientWidth) {
      this.carouselContainer.nativeElement.scrollTo({
        left: this.carouselContainer.nativeElement.scrollLeft + 1000,
        behavior: 'smooth'
      });
      setTimeout(() => {
        this.updateNavigation();
      }, 300);
    }
  }

  private updateNavigation() {
    const container = this.carouselContainer.nativeElement;
    const tolerance = 5; // small tolerance to handle rounding issues
    this.canNavigateLeft = container.scrollLeft > 0;
    this.canNavigateRight = container.scrollWidth > container.scrollLeft + container.clientWidth + tolerance;
  }

  private resetCarousel() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollTo({
        left: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        this.updateNavigation();
      }, 300);
    } else {
      console.warn('Carousel container not found.');
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    window.removeEventListener('resize', this.updateNavigation.bind(this));
  }
}
