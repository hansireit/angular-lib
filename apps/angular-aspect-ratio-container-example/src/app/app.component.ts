import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgAspectRatioDirective } from 'angular-aspect-ratio-container';

@Component({
  imports: [RouterModule, NgAspectRatioDirective],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="wrapper" style="width: 100vw; height: 100vh">
      <div [ngAspectRatio]="16 / 9" style="background-color: lightblue">Hello</div>
    </div>
  `
})
export class AppComponent {}
