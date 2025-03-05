import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollViewWithIndicatorComponent } from 'angular-overflow-indicator';

@Component({
  selector: 'app-scroll-state-example',
  imports: [CommonModule, ScrollViewWithIndicatorComponent],
  templateUrl: './scroll-state-example.component.html',
  styleUrl: './scroll-state-example.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollStateExampleComponent {
  readonly itemCount = signal(10);
  readonly items = computed(() => {
    const list: number[] = [];
    for (let i = 0; i < this.itemCount(); i++) {
      list.push(i);
    }
    return list;
  });
  readonly scrollState = signal(2);

  private readonly cdr = inject(ChangeDetectorRef);

  setScrollState(state: number): void {
    this.scrollState.set(state);
    this.cdr.detectChanges();
  }
}
