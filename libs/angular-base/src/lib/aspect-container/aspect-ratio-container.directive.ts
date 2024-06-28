import { ElementRef, AfterViewInit, Renderer2, OnDestroy, Directive, input, inject } from '@angular/core';
import { SizingMode } from './sizing-mode';

@Directive({
  selector: '[ngLibAspectRatio]',
  standalone: true,
})
export class AspectRatioContainerDirective implements AfterViewInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly hostElem = inject(ElementRef);
  private readonly observer: ResizeObserver;
  targetRatio = input.required<number>({ alias: 'hdevAspectRatio' });
  sizingMode = input<SizingMode>('match-parent');

  constructor() {
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
    this.renderer.setStyle(this.hostElem.nativeElement, 'width', `${width}px`);
  }

  private setAcInnerHeight(height: number) {
    this.renderer.setStyle(this.hostElem.nativeElement, 'height', `${height}px`);
  }
}
