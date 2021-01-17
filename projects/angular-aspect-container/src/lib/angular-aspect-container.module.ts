import { NgModule } from '@angular/core';
import { AngularAspectContainerComponent } from './angular-aspect-container.component';
import { AcRatioComponent } from './ac-ratio/ac-ratio.component';

@NgModule({
  declarations: [AngularAspectContainerComponent, AcRatioComponent],
  imports: [],
  exports: [AngularAspectContainerComponent, AcRatioComponent]
})
export class AngularAspectContainerModule {}
