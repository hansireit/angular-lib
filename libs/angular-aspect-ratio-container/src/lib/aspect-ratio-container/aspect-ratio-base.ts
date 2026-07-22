import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  Renderer2,
  Signal
} from '@angular/core';
import { SizingMode } from './sizing-mode';

@Directive({})
export abstract class AspectRatioBase implements AfterViewInit, OnDestroy {
  protected readonly renderer = inject(Renderer2);
  protected readonly hostElem = inject(ElementRef);
  private readonly observer: ResizeObserver;

  sizingMode = input<SizingMode>('match-parent');

  containerWidthChanged = output<number>();
  containerHeightChanged = output<number>();

  abstract readonly targetRatio: Signal<number>;

  protected constructor() {
    this.observer = new ResizeObserver(() => {
      this.calculateAndSetAspect();
    });
  }

  ngAfterViewInit() {
    this.observer.observe(this.hostElem.nativeElement.parentElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  public calculateAndSetAspect(): void {
    this.renderer.removeStyle(this.hostElem.nativeElement, 'width');
    this.renderer.removeStyle(this.hostElem.nativeElement, 'height');

    let targetWidth: number;
    let targetHeight: number;

    if (this.sizingMode() === 'match-parent') {
      const hostWidth = this.hostElem.nativeElement.parentElement.offsetWidth;
      const hostHeight = this.hostElem.nativeElement.parentElement.offsetHeight;
      const hostAspectRatio = hostWidth / hostHeight;

      if (hostAspectRatio >= this.targetRatio()) {
        // use full height as base
        targetHeight = hostHeight;
        targetWidth = targetHeight * this.targetRatio();
      } else {
        // use full width as base
        targetWidth = hostWidth;
        targetHeight = targetWidth * (1 / this.targetRatio());
      }
    } else {
      // Add +1 to the dimensions because decimals get rounded
      const contentWidth = this.hostElem.nativeElement.offsetWidth + 1;
      const contentHeight = this.hostElem.nativeElement.offsetHeight + 1;

      const currentRatio = contentWidth / contentHeight;
      if (currentRatio >= this.targetRatio()) {
        targetWidth = contentWidth;
        targetHeight = targetWidth * (1 / this.targetRatio());
      } else {
        targetHeight = contentHeight;
        targetWidth = targetHeight * this.targetRatio();
      }
    }
    // Set calculated dimensions
    this.setAcInnerWidth(targetWidth);
    this.setAcInnerHeight(targetHeight);
  }

  private setAcInnerWidth(width: number) {
    this.containerWidthChanged.emit(width);
    this.renderer.setStyle(this.hostElem.nativeElement, 'width', `${width}px`);
  }

  private setAcInnerHeight(height: number) {
    this.containerHeightChanged.emit(height);
    this.renderer.setStyle(this.hostElem.nativeElement, 'height', `${height}px`);
  }
}
