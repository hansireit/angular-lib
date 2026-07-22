import { Directive, input } from '@angular/core';
import { AspectRatioBase } from './aspect-ratio-base';

@Directive({
  selector: '[ngAspectRatio]'
})
export class NgAspectRatioDirective extends AspectRatioBase {
  ngAspectRatio = input.required<number>();
  override targetRatio = this.ngAspectRatio;

  constructor() {
    super();
  }
}
