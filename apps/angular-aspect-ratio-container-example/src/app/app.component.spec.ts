import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgAspectRatioDirective } from 'angular-aspect-ratio-container';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let observerCallback: ResizeObserverCallback | null = null;
  beforeEach(() => {
    global.ResizeObserver = class FakeResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        observerCallback = callback;
      }
      observe() {
        return;
      }
      disconnect() {
        return;
      }
      unobserve() {
        return;
      }
    };
    fixture = TestBed.configureTestingModule({}).createComponent(AppComponent);
    fixture.detectChanges();
  });
  it('should render the aspect container correctly', async () => {
    const container = fixture.debugElement.query(By.directive(NgAspectRatioDirective));
    expect(container).toBeDefined();
    if (!observerCallback) {
      fail('Observer not initialized');
    }
    // Fake the size of the parent element, as jest does not render the dimensions of elements
    jest.spyOn(container.nativeElement, 'parentElement', 'get').mockReturnValue({
      offsetWidth: 500,
      offsetHeight: 500
    });
    // Trigger a resize of the parent container to recalculate the container size
    observerCallback?.([], {} as ResizeObserver);
    fixture.detectChanges();
    expect(container.styles['width']).toBe('500px');
    expect(container.styles['height']).toBe('281.25px');
  });
});
