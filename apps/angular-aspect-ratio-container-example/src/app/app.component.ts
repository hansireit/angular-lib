import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgAspectRatioDirective } from 'angular-aspect-ratio-container';

@Component({
    imports: [RouterModule, NgAspectRatioDirective],
    selector: 'app-root',
    template: `
    <main style="width: 600px; height: 600px; display: flex; align-items: center">
      <div [ngAspectRatio]="16 / 9" style="background-color: red">Hello</div>
    </main>
  `
})
export class AppComponent {}
