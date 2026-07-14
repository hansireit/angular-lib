import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomIndicatorExampleComponent } from './custom-indicator-example/custom-indicator-example.component';
import { ScrollStateExampleComponent } from './scroll-state-example/scroll-state-example.component';

@Component({
  imports: [CustomIndicatorExampleComponent, ScrollStateExampleComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
