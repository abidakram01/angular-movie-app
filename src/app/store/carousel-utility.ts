export class CarouselUtility {
  private _elementWidth: number = 0;
  private _carouselWidth: number = 0;
  private _visibleWidth: number = 0;
  private _maximumPosition: number = 0;
  private _unusableVisibleWidth: number = 0;
  private _disableLeftButton: boolean = true;
  private _disableRightButton: boolean = false;

  get elementWidth() {
    return this._elementWidth;
  }

  get carouselWidth() {
    return this._carouselWidth;
  }

  get visibleWidth() {
    return this._visibleWidth;
  }

  get maximumPosition() {
    return this._maximumPosition;
  }

  get unusableVisibleWidth() {
    return this._unusableVisibleWidth;
  }

  get disableLeftButton() {
    return this._disableLeftButton;
  }

  get disableRightButton() {
    return this._disableRightButton;
  }

  calculateState(numberOfItems: number, elementWidth: number, visibleWidth: number): { disableLeftButton: boolean, disableRightButton: boolean } {
    let unusableVisibleWidth = 72;
    const carouselWidth = numberOfItems * elementWidth;
    const maxPosition = carouselWidth - visibleWidth;

    if (window.innerWidth >= 1200) {
      unusableVisibleWidth = 92;
    }

    const adjustedVisibleWidth = visibleWidth - unusableVisibleWidth;

    this._unusableVisibleWidth = unusableVisibleWidth;
    this._elementWidth = elementWidth;
    this._carouselWidth = carouselWidth;
    this._visibleWidth = adjustedVisibleWidth;
    this._maximumPosition = maxPosition;
    this._disableLeftButton = maxPosition <= 0; // Fix logic
    this._disableRightButton = adjustedVisibleWidth >= carouselWidth;

    return {
      disableLeftButton: this._disableLeftButton,
      disableRightButton: this._disableRightButton
    };
  }

  moveToClickEvent(direction: 'left' | 'right', scrollElement: HTMLElement, visibleWidth: number, elementWidth: number) {
    const scrollAmount = direction === 'left' ? -visibleWidth + elementWidth : visibleWidth - elementWidth;
    const targetScrollLeft = scrollElement.scrollLeft + scrollAmount;
    const remainder = Math.round(targetScrollLeft / elementWidth) * elementWidth;

    this.moveTo(scrollElement, remainder);
  }

  scrollEvent(scrollElement: HTMLElement, maximumPosition: number, visibleWidth: number, elementWidth: number): { disableLeftButton: boolean, disableRightButton: boolean } {
    const scrollLeft = scrollElement.scrollLeft;
    const end = maximumPosition - visibleWidth;

    return {
      disableLeftButton: scrollLeft <= 0,
      disableRightButton: scrollLeft >= end
    };
  }

  private moveTo(scrollElement: HTMLElement, left: number) {
    scrollElement.scrollTo({
      left: left,
      behavior: 'smooth'
    });
  }
}
