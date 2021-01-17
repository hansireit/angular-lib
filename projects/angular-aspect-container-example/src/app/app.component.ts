import { Component } from '@angular/core';
import { AcCenterMode } from 'angular-aspect-container';
import { AcSizingMode } from 'angular-aspect-container';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public AcCenterMode = AcCenterMode;
  public AcSizingMode = AcSizingMode;
  
  title = 'angular-aspect-container-example';
}
