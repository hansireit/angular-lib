import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultIndicatorButtonComponent } from '../default-indicator-button';

@Component({
  selector: 'ng-scroll-view-with-indicator',
  templateUrl: './scroll-view-with-indicator.component.html',
  styleUrls: ['./scroll-view-with-indicator.component.css'],
  imports: [CommonModule, DefaultIndicatorButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewWithIndicatorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLDivElement>;
  scrollState = output<number>();

  readonly indicatorButton = input.required<TemplateRef<unknown>>();
  readonly isOverflowing = signal(false);
  readonly isAtBottom = signal(false);

  private readonly cdr = inject(ChangeDetectorRef);
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverflowState();
      this.updateScrollState();
      this.cdr.detectChanges();
    });

    this.resizeObserver.observe(this.contentWrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /**
   * Manually scrolls the content-container to the bottom
   */
  scrollToBottom(): void {
    this.contentWrapper.nativeElement.scrollTop = this.contentWrapper.nativeElement.scrollHeight;
  }

  /**
   * If the user scrolled all the way to the end of the container,
   * the indicator button can be hidden
   */
  onScroll(): void {
    this.updateScrollState();
  }

  private updateOverflowState(): void {
    const element = this.contentWrapper.nativeElement;
    const maxScroll = element.scrollHeight - element.offsetHeight;
    this.isOverflowing.set(element.offsetHeight < element.scrollHeight && element.scrollTop < maxScroll);
  }

  private updateScrollState(): void {
    const element = this.contentWrapper.nativeElement;
    const maxScroll = element.scrollHeight - element.offsetHeight;
    this.isAtBottom.set(element.scrollTop + 1 >= maxScroll);
    this.scrollState.emit(Math.round((100 / maxScroll) * (element.scrollTop + 1)));
  }
}
