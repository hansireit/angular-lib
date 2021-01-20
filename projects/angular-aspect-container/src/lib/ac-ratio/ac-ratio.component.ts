import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import { AcSizingMode } from '../AcSizingMode';
import { AcCenterMode } from '../AcCenterMode';

@Component({
  selector: 'lib-ac-ratio',
  templateUrl: './ac-ratio.component.html',
  styleUrls: ['./ac-ratio.component.css'],
})
export class AcRatioComponent implements AfterViewInit {
  private _targetRatio: number = 16 / 9;

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
  sizingMode: AcSizingMode = AcSizingMode.MATCH_PARENT;

  @Input()
  centerMode: AcCenterMode = AcCenterMode.CENTER;

  @ViewChild('acRatioInner')
  acRatioInner: ElementRef;

  constructor(private renderer: Renderer2, private hostElem: ElementRef) {}

  ngAfterViewInit() {
    this.calculateAndSetAspect();
  }

  @HostListener('window:resize', ['$event'])
  onHostResize(event) {
    this.calculateAndSetAspect();
  }

  public calculateAndSetAspect(): void {
    this.renderer.removeStyle(this.acRatioInner.nativeElement, 'width');
    this.renderer.removeStyle(this.acRatioInner.nativeElement, 'height');

    const hostWidth = this.hostElem.nativeElement.offsetWidth;

    if (this.sizingMode === AcSizingMode.MATCH_PARENT) {
      const targetHeight = hostWidth / this.targetRatio;
      this.renderer.setStyle(
        this.acRatioInner.nativeElement,
        'width',
        `${hostWidth}px`
      );

      this.renderer.setStyle(
        this.acRatioInner.nativeElement,
        'height',
        `${targetHeight}px`
      );
    } else {
      const contentWidth = this.acRatioInner.nativeElement.offsetWidth + 1;
      const contentHeight = this.acRatioInner.nativeElement.offsetHeight + 1;
      let targetWidth: number = 0;
      let targetHeight: number = 0;

      const currentRatio = contentWidth / contentHeight;
      if (currentRatio >= this._targetRatio) {
        targetWidth = contentWidth;
        targetHeight = targetWidth * (1 / this._targetRatio);
      } else {
        targetHeight = contentHeight;
        targetWidth = targetHeight * this._targetRatio;
      }

      this.renderer.setStyle(
        this.acRatioInner.nativeElement,
        'width',
        `${targetWidth}px`
      );

      this.renderer.setStyle(
        this.acRatioInner.nativeElement,
        'height',
        `${targetHeight}px`
      );
    }

    switch (this.centerMode) {
      case AcCenterMode.CENTER:
        this.renderer.setStyle(
          this.hostElem.nativeElement,
          'justify-content',
          'center'
        );
        break;

      case AcCenterMode.LEFT:
        this.renderer.setStyle(
          this.hostElem.nativeElement,
          'justify-content',
          'flex-start'
        );
        break;

      case AcCenterMode.RIGHT:
        this.renderer.setStyle(
          this.hostElem.nativeElement,
          'justify-content',
          'flex-end'
        );
        break;
    }
  }
}
