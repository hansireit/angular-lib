import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  HostListener
} from '@angular/core';
import { AcSizingMode } from '../AcSizingMode';
import { AcCenterMode } from '../AcCenterMode';

@Component({
  selector: 'lib-ac-ratio',
  templateUrl: './ac-ratio.component.html',
  styleUrls: ['./ac-ratio.component.css']
})
export class AcRatioComponent implements AfterViewInit {
  @Input()
  targetRatio: number = 1 / 1;

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
      const contentWidth = this.acRatioInner.nativeElement.offsetWidth;
      const contentHeight = this.acRatioInner.nativeElement.offsetHeight;
      let targetWidth: number = 0;
      let targetHeight: number = 0;

      const currentRatio = contentWidth / contentHeight;

      if (currentRatio >= this.targetRatio) {
        targetWidth = contentWidth;
        targetHeight = targetWidth / this.targetRatio;
      } else {
        targetHeight = contentHeight;
        targetWidth = targetHeight * this.targetRatio;
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
