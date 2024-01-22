import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollViewWithIndicatorComponent } from 'angular-overflow-indicator';

@Component({
  selector: 'app-custom-indicator-example',
  standalone: true,
  imports: [CommonModule, ScrollViewWithIndicatorComponent],
  templateUrl: './custom-indicator-example.component.html',
  styleUrl: './custom-indicator-example.component.scss'
})
export class CustomIndicatorExampleComponent {
  readonly itemCount = signal(10);
  readonly items = computed(() => {
    const list: number[] = [];
    for (let i = 0; i < this.itemCount(); i++) {
      list.push(i);
    }
    return list;
  });
}
