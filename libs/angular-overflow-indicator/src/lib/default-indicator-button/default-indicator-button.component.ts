import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ng-scroll-view-default-indicator-button',
  template: `
    <button class="default-button" (click)="buttonClicked.emit()">
      <span>There is more content</span>
    </button>
  `,
  styles: `
    button {
      border: none;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.4rem 0.6rem;
      background-color: #444444;
      color: #ffffff;
      border-radius: 1rem;
      margin-bottom: 0.4rem;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultIndicatorButtonComponent {
  @Output() buttonClicked = new EventEmitter();
}
