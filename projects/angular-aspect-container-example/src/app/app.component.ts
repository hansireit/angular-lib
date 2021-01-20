import { Component, Input } from '@angular/core';
import { AcCenterMode } from 'angular-aspect-container';
import { AcSizingMode } from 'angular-aspect-container';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public AcCenterMode = AcCenterMode;
  public AcSizingMode = AcSizingMode;

  public inputAspectRatio: number = 1;
  public inputSizingMode: AcSizingMode = AcSizingMode.FIT_CONTENT;
  public inputCenterMode: AcCenterMode = AcCenterMode.CENTER;

  title = 'angular-aspect-container-example';
}
