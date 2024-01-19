import { Component, signal } from '@angular/core';
import { ScrollViewWithIndicatorComponent, ScrollViewWithIndicatorDirective } from 'angular-overflow-indicator';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [ScrollViewWithIndicatorDirective, NgIf, ScrollViewWithIndicatorComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-overflow-indicator-example';

  counter = signal(0);
}
