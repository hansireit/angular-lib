import {
  AfterViewInit,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  signal,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { ScrollViewWithIndicatorComponent } from './scroll-view-with-indicator.component';

@Directive({
  selector: '[libScrollViewWithIndicator]',
  standalone: true
})
export class ScrollViewWithIndicatorDirective implements AfterViewInit, OnDestroy {
  @HostBinding('style.position') position = 'relative';
  @Input() libScrollViewWithIndicator!: TemplateRef<unknown>;

  isOverflowing = signal(false);

  private resizeObserver: ResizeObserver | null = null;

  constructor(
    private element: ElementRef,
    private injector: EnvironmentInjector,
    private vcr: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.openComponent(this.libScrollViewWithIndicator);
    const element = this.element.nativeElement;
    this.resizeObserver = new ResizeObserver(() => {
      const maxScroll = element.scrollHeight - element.offsetHeight;
      this.isOverflowing.set(element.offsetHeight < element.scrollHeight && element.scrollTop < maxScroll);
      console.log(this.isOverflowing());
    });

    this.resizeObserver.observe(element);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /**
   * Manually scrolls the content-container to the bottom
   */
  scrollToBottom(): void {
    this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
  }

  openComponent(content: TemplateRef<unknown>) {
    const ngContent = this.createNgContent(content);
    const component = createComponent(ScrollViewWithIndicatorComponent, {
      environmentInjector: this.injector,
      projectableNodes: ngContent
    });

    component.hostView.detectChanges();
    this.renderer.appendChild(this.element.nativeElement, component.location.nativeElement);
  }

  createNgContent(content: TemplateRef<unknown>) {
    const viewRef = this.vcr.createEmbeddedView(content, null, {
      injector: this.vcr.injector
    });
    viewRef.detectChanges();
    return [viewRef.rootNodes, viewRef.rootNodes];
  }

  /**
   * If the user scrolled all the way to the end of the container,
   * the indicator button can be hidden
   */
  onScroll(): void {
    const element = this.element.nativeElement;
    const maxScroll = element.scrollHeight - element.offsetHeight;
    this.isOverflowing.set(element.scrollTop < maxScroll);
  }
}
