import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  HostListener,
  OnDestroy
} from '@angular/core';
import { AcSizingMode } from '../AcSizingMode';
import { AcHorizontalAlignment } from '../AcHorizontalAlignment';
import { AcVerticalAlignment } from '../AcVerticalAlignment';

@Component({
  selector: 'lib-ac-ratio',
  templateUrl: './ac-ratio.component.html',
  styleUrls: ['./ac-ratio.component.css']
})
export class AcRatioComponent implements AfterViewInit, OnDestroy {
  private lastHostDimension: [number, number];
  private intervalId;

  private _targetRatio: number = 16 / 9;
  private _sizingMode: AcSizingMode = AcSizingMode.MATCH_PARENT;
  private _horizontalAlignment: AcHorizontalAlignment =
    AcHorizontalAlignment.CENTER;
  private _verticalAlignment: AcVerticalAlignment = AcVerticalAlignment.CENTER;
  private _backgroundColorStr: string = 'rgba(0,0,0,0)';

  @Input()
  set targetRatio(val: number) {
    this._targetRatio = val;
    if (this.acRatioInner != null) {
      this.calculateAndSetAspect();
    }
  }
  get targetRatio() {
    return this._targetRatio;
  }

  @Input()
  set sizingMode(val: AcSizingMode) {
    this._sizingMode = val;
    if (this.acRatioInner != null) {
      this.calculateAndSetAspect();
    }
  }
  get sizingMode() {
    return this._sizingMode;
  }

  @Input()
  set horizontalAlignment(val: AcHorizontalAlignment) {
    this._horizontalAlignment = val;
    if (this.acRatioInner != null) {
      this.calculateAndSetAspect();
    }
  }
  get horizontalAlignment() {
    return this._horizontalAlignment;
  }

  @Input()
  set verticalAlignment(val: AcVerticalAlignment) {
    this._verticalAlignment = val;
    if (this.acRatioInner != null) {
      this.calculateAndSetAspect();
    }
  }
  get verticalAlignment() {
    return this._verticalAlignment;
  }

  @Input()
  set backgroundColorStr(val: string) {
    this._backgroundColorStr = val;
    this.setContentWrapperBackground();
  }

  get backgroundColorStr(): string {
    return this._backgroundColorStr;
  }

  @ViewChild('acRatioInner')
  acRatioInner: ElementRef;

  @ViewChild('contentWrapper')
  acContentWrapper: ElementRef;

  constructor(private renderer: Renderer2, private hostElem: ElementRef) {}

  ngAfterViewInit() {
    this.calculateAndSetAspect();

    this.intervalId = setInterval(() => {
      this.checkIfHostResized();
    }, 50);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private checkIfHostResized() {
    if (this.hostElem != null) {
      const hostWidth = this.hostElem.nativeElement.offsetWidth;
      const hostHeight = this.hostElem.nativeElement.offsetHeight;

      if (
        this.lastHostDimension == null ||
        hostWidth != this.lastHostDimension[0] ||
        hostHeight != this.lastHostDimension[1]
      ) {
        this.lastHostDimension = [hostWidth, hostHeight];
        this.calculateAndSetAspect();
      }
    } else {
      console.warn('Host elem null');
    }
  }

  @HostListener('window:resize', ['$event'])
  onHostResize() {
    this.calculateAndSetAspect();
  }

  public calculateAndSetAspect(): void {
    this.removeContenCentering();

    this.renderer.removeStyle(this.acRatioInner.nativeElement, 'width');
    this.renderer.removeStyle(this.acRatioInner.nativeElement, 'height');

    let targetWidth: number;
    let targetHeight: number;

    if (this._sizingMode === AcSizingMode.MATCH_PARENT) {
      this.justifyContentHorizontally('center');
      this.alignItemsVertically('center');

      const hostWidth = this.hostElem.nativeElement.offsetWidth;
      const hostHeight = this.hostElem.nativeElement.offsetHeight;
      const hostAspectRatio = hostWidth / hostHeight;

      if (hostAspectRatio >= this.targetRatio) {
        // use full height as base
        targetHeight = hostHeight;
        targetWidth = targetHeight * this.targetRatio;
      } else {
        // use full width as base
        targetWidth = hostWidth;
        targetHeight = targetWidth * (1 / this.targetRatio);
      }
    } else {
      // To use the real content height/width
      this.disableContentExpanding();

      // Add +1 to the dimensions because decimals get rounded
      const contentWidth = this.acContentWrapper.nativeElement.offsetWidth + 1;
      const contentHeight =
        this.acContentWrapper.nativeElement.offsetHeight + 1;

      const currentRatio = contentWidth / contentHeight;
      if (currentRatio >= this._targetRatio) {
        targetWidth = contentWidth;
        targetHeight = targetWidth * (1 / this._targetRatio);
      } else {
        targetHeight = contentHeight;
        targetWidth = targetHeight * this._targetRatio;
      }
      this.enableContentExpanding();
    }
    // Set calculated dimensions
    this.setAcInnerWidth(targetWidth);
    this.setAcInnerHeight(targetHeight);

    // Align content
    this.setHorizontalAlignment();
    this.setVerticalAlignment();

    this.setContentWrapperBackground();
  }

  private setHorizontalAlignment(): void {
    switch (this._horizontalAlignment) {
      case AcHorizontalAlignment.CENTER:
        this.justifyContentHorizontally('center');
        break;

      case AcHorizontalAlignment.LEFT:
        this.justifyContentHorizontally('flex-start');
        break;

      case AcHorizontalAlignment.RIGHT:
        this.justifyContentHorizontally('flex-end');
        break;
    }
  }

  private setVerticalAlignment(): void {
    switch (this._verticalAlignment) {
      case AcVerticalAlignment.CENTER:
        this.alignItemsVertically('center');
        break;

      case AcVerticalAlignment.TOP:
        this.alignItemsVertically('flex-start');
        break;

      case AcVerticalAlignment.BOTTOM:
        this.alignItemsVertically('flex-end');
        break;
    }
  }

  private setAcInnerWidth(width: number) {
    this.renderer.setStyle(
      this.acRatioInner.nativeElement,
      'width',
      `${width}px`
    );
  }

  private setAcInnerHeight(height: number) {
    this.renderer.setStyle(
      this.acRatioInner.nativeElement,
      'height',
      `${height}px`
    );
  }

  private justifyContentHorizontally(alignment: string = 'center'): void {
    this.renderer.setStyle(
      this.hostElem.nativeElement,
      'justify-content',
      alignment
    );
  }

  private alignItemsVertically(alignment: string = 'center'): void {
    this.renderer.setStyle(
      this.hostElem.nativeElement,
      'align-items',
      alignment
    );
  }

  private removeContenCentering(): void {
    this.renderer.removeStyle(this.hostElem.nativeElement, 'justify-content');
    this.renderer.removeStyle(this.hostElem.nativeElement, 'align-items');
  }

  private setContentWrapperBackground(): void {
    if (this.acContentWrapper != null) {
      this.renderer.setStyle(
        this.acContentWrapper.nativeElement,
        'background-color',
        this._backgroundColorStr
      );
    } else {
      console.warn(
        'Content Wrapper is undefined in "setContentWrapperBackground()"'
      );
    }
  }

  private disableContentExpanding() {
    this.renderer.removeStyle(this.acContentWrapper.nativeElement, 'min-width');
    this.renderer.removeStyle(
      this.acContentWrapper.nativeElement,
      'min-height'
    );
  }

  private enableContentExpanding() {
    this.renderer.setStyle(
      this.acContentWrapper.nativeElement,
      'min-width',
      '100%'
    );
    this.renderer.setStyle(
      this.acContentWrapper.nativeElement,
      'min-height',
      '100%'
    );
  }
}
