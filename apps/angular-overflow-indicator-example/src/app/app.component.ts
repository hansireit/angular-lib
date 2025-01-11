import { Component } from '@angular/core';
import { CustomIndicatorExampleComponent } from './custom-indicator-example/custom-indicator-example.component';
import { ScrollStateExampleComponent } from './scroll-state-example/scroll-state-example.component';

@Component({
    imports: [CustomIndicatorExampleComponent, ScrollStateExampleComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {}
