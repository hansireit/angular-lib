import { Component } from '@angular/core';
import { AcHorizontalAlignment } from 'angular-aspect-container';
import { AcVerticalAlignment } from 'angular-aspect-container';
import { AcSizingMode } from 'angular-aspect-container';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  public AcSizingMode = AcSizingMode;
  public AcHorizontalAlignment = AcHorizontalAlignment;
  public AcVerticalAlignment = AcVerticalAlignment;

  public inputAspectRatio: number = 1;
  public inputSizingMode: AcSizingMode = AcSizingMode.FIT_CONTENT;
  public inputHorizontalAlignment: AcHorizontalAlignment =
    AcHorizontalAlignment.CENTER;
  public inputVerticalAlignment: AcVerticalAlignment =
    AcVerticalAlignment.CENTER;

  title = 'angular-aspect-container-example';
}
